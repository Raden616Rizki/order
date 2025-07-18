/**
 * The helper functions of a model that uses Knexjs to store and retrieve data from a
 * database using the provided 'knex' instance. Custom functionality can be
 * composed on top of this set of common functions.
 *
 * The idea is that these are the most-used types of functions that most/all
 * "models" will want to have. They can be overridden/modified/extended if
 * needed by composing a new object out of the one returned by this function ;)
 */

const { limit } = require("../../database/connection");
const debug = require("debug")("app:modelHelper");

module.exports = ({
  knex = {},
  name = "name",
  tableName = "tableName",
  selectableProps = [],
  timeout = 1000,
}) => {
  // Create an entity
  const create = (props) => {
    delete props.id; // Not allowed to set id manually

    return knex
      .insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout);
  };

  const update = (id, props) =>
    knex(tableName).update(props).where({ id }).timeout(timeout);

  // Find list of entity
  const find = (filters) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout);

  // Find a particular entity
  const findOne = (filters) =>
    find(filters).then((results) => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });
  
  const read = (id) => 
    knex
      .select(selectableProps)
      .from(tableName)
      .where({ id })
      .first()

  const getAllItemsFiltered = async (filters = [], page = 1, limit = 10) => {
    try {
      const query = knex.select(selectableProps).from(tableName);

      // Apply filters
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value !== undefined) {
          // Handle different operators with filters
          if (typeof value === "object" && value !== null) {
            const { like, min, max } = value;
            if (like !== undefined) {
              query.whereRaw('LOWER(??) LIKE ?', [key, `%${like.toLowerCase()}%`]);
            }

            if (min !== undefined) {
              query.where(key, ">=", min);
            }

            if (max !== undefined) {
              query.where(key, "<=", max);
            }
          } else {
            query.where(key, value);
          }
        }
      });

      // Count total items
      const totalCountQuery = query.clone().clearSelect().count("* as total");
      const [{ total }] = await totalCountQuery;

      // Pagination query
      query.offset((page - 1) * limit).limit(limit);

      // Execute the query
      const items = await query;
      return {
        total,
        items,
      };
    } catch (e) {
      debug(e);
      throw new Error(`Error fetching the items: ${e.message}`);
    }
  };

  return {
    create,
    update,
    read,
    find,
    findOne,
    getAllItemsFiltered,
  };
};
