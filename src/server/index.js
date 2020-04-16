require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const HttpStatus = require('http-status-codes');
const router = require('./routes');
const logger = require('./logger');
const helper = require('./helper');

const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
  logger.info(`${helper.extractClientIp(req)} ${req.method.toUpperCase()} ${req.originalUrl}`);
  next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(process.env.DIST || 'dist'));
app.use('/', router);

app.use((req, res) => {
  const indexPath = path.resolve(process.env.DIST || 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    helper.sendJsonFailedResp(res, HttpStatus.NOT_FOUND);
  }
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  let statusCode = err.status;
  let errorMessage = err.message;

  if (!statusCode) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }

  if (!errorMessage) {
    errorMessage = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
  }

  logger.error(`Error: ${statusCode} ${err}`);

  helper.sendJsonFailedResp(res, statusCode, errorMessage);
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;
server.listen(port, host, () => {
  logger.info(`App is listening on ${host}:${port}`);
});
