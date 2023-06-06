
const winston = require("winston");
 
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined66.log' })
  ]
});

logger.info('Will not be logged in either transport!');
logger.info('Will be logged in both transports!');

module.exports= logger;