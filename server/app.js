const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))
app.use('/', require('./src/routes/auth.route'))
app.use(require('./src/middleware/error.middleware').all);

module.exports = app;