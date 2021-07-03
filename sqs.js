const { aws } = require("./aws.js");
const config = require("./configurations");

const sqs = new aws.SQS();

const deleteMessage = async (QueueUrl, ReceiptHandle) => {
  try {
    const deleteParams = {
      QueueUrl: QueueUrl,
      ReceiptHandle: ReceiptHandle,
    };

    const response = await sqs.deleteMessage(deleteParams).promise();

    console.log(
      `Deleted ${response.ResponseMetadata.RequestId} from ${QueueUrl}`
    );
  } catch (err) {
    console.log(err);
  }
};

const receiveMessage = async (QueueUrl) => {
  try {
    const params = {
      AttributeNames: ["SentTimestamp"],
      MaxNumberOfMessages: 10,
      QueueUrl: QueueUrl,
    };

    const result = await sqs.receiveMessage(params).promise();

    return result.Messages;
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async (QueueUrl, body) => {
  try {
    const params = {
      MessageBody: JSON.stringify(body),
      MessageDeduplicationId: body.id,
      MessageGroupId: "MessageGroupOne",
      QueueUrl: QueueUrl,
    };

    const message = await sqs.sendMessage(params).promise();

    console.log(`Sent ${message.MessageId} to ${QueueUrl}`);
  } catch (err) {
    console.log(err);
  }
};

const clearQueues = async () => {
  await sqs.purgeQueue({ QueueUrl: config.FIRST_QUEUE_URL }).promise();
  await sqs.purgeQueue({ QueueUrl: config.SECOND_QUEUE_URL }).promise();
};

module.exports = { sendMessage, receiveMessage, deleteMessage, clearQueues };
