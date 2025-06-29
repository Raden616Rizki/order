// Gather up all model files (i.e., any file present in the current directory
// that is not this file) and export them as properties of an object such that
// they may be imported using destructuring like
// `const { MyModel } = require('./models')` where there is a model named
// `MyModel` present in the exported object of gathered models.

const fs = require('fs');
const path = require('path');
const debug = require('debug')('order:modelsIndex');
const knex = require('../../database/knexfile');

const getModelFiles = (dir) => fs.readdirSync(dir)
    .filter((file) => (file.indexOf('.') !== -1) && (file !== 'index.js'))
    .map((file) => path.join(dir, file));

const files = getModelFiles(__dirname);
debug(files);

const models = files.reduce((modelObj, filename) => {
    const initModel = require(filename);
    const model = initModel(knex);

    if (model) {
        modelObj[model.name] = model;
    }

    return modelObj;
}, {});

model.exports = models;