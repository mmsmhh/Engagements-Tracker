const aws = require("aws-sdk");
const config = require("./configurations.js");

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS,
  accessKeyId: config.AWS_ACCESS_KEY,
  region: config.AWS_REGION,
});

module.exports = {
  aws,
};
