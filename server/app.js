const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');

const swaggerJsDocs = yaml.load('./src/api.yaml');

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use('/', require('./src/routes/auth.route'))
app.use(require('./src/middleware/error.middleware').all);

module.exports = app;