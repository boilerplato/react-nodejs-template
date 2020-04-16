const HttpStatus = require('http-status-codes');

const extractClientIp = (req) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return clientIP.split(',')[0].trim();
};

const sendJsonSuccessResp = (res, code, data) => {
  res.status(code)
    .json({
      status: 'Success',
      code,
      data
    });
};

const sendJsonFailedResp = (res, code, message) => {
  res.status(code)
    .json({
      status: 'Failed',
      code,
      message: message || HttpStatus.getStatusText(code)
    });
};

module.exports = {
  extractClientIp,
  sendJsonSuccessResp,
  sendJsonFailedResp
};
