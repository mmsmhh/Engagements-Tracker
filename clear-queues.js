const { clearQueues } = require("./sqs");

const clearAllQueues = async () => {
  try {
    await clearQueues();
    console.log("Queues cleared successfully!");
  } catch (error) {
    console.log("Please wait a few seconds and try again!");
  }
};

clearAllQueues();
