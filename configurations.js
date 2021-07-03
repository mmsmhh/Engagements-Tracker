const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  AWS_SECRET_ACCESS: process.env.AWS_SECRET_ACCESS,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  FIRST_QUEUE_URL: process.env.FIRST_QUEUE_URL,
  SECOND_QUEUE_URL: process.env.SECOND_QUEUE_URL,
};
