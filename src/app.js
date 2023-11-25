const express = require('express');
const fs = require('node:fs/promises');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/api'));

module.exports = app