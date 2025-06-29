
/**
 * The helper functions of a model that uses Knexjs to store and retrieve data from a
 * database using the provided 'knex' instance. Custom functionality can be
 * composed on top of this set of common functions.
 *
 * The idea is that these are the most-used types of functions that most/all
 * "models" will want to have. They can be overridden/modified/extended if
 * needed by composing a new object out of the one returned by this function ;)
 */

module.exports = ({
    knex = {},
    name = 'name',
    tableName = 'tableName',
    selectTableProps = [],
    timeout = 1000   
}) => {
    // Create an entity
    const create = (props) => {
        delete props.id; // Not allowed to set id manually

        return knex(props)
            .returning(selectTableProps)
            .into(tableName)
            .timeout(timeout);
    }

    // Find list of entity
    const find = (filters) => knex.select(selectTableProps)
        .from(tableName)
        .where(filters)
        .timeout(timeout);

    // Find a particular entity
    const findOne = (filters) => find(filters)
        .then((results) => {
            if (!Array.isArray(results)) return results;
            
            return results[0];    
        });
    
    return {
        create,
        find,
        findOne,
    }
}