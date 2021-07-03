const config = require("./configurations");
const { round } = require("./utils");
const moment = require("moment");

const { sendMessage, receiveMessage, deleteMessage } = require("./sqs");
const { writeToFile, clearFile } = require("./fs");
const {
  enrichConversation,
  shouldConversationEnriched,
} = require("./conversation");
const { updateState, getState } = require("./state");

const enrichingService = async () => {
  console.log("Enriching service started!");

  while (true) {
    const messages = (await receiveMessage(config.FIRST_QUEUE_URL)) || [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      const conversation = JSON.parse(message.Body);

      if (shouldConversationEnriched(conversation)) {
        const enrichedConversation = enrichConversation(conversation);

        await sendMessage(config.SECOND_QUEUE_URL, enrichedConversation);
      }

      await deleteMessage(config.FIRST_QUEUE_URL, message.ReceiptHandle);
    }

    const messages2 = (await receiveMessage(config.SECOND_QUEUE_URL)) || [];

    for (let i = 0; i < messages2.length; i++) {
      const message = messages2[i];
      const conversation = JSON.parse(message.Body);
      const timeStamp = moment(
        parseInt(message.Attributes.SentTimestamp)
      ).format("DD-MM-YYYY hh:mm:ss A");

      await updateState(conversation.total_engagements);

      const newState = await getState();

      const average = round(newState.sum / newState.total);

      await writeToFile("output.txt", `${timeStamp} -> ${average}\n`, true);

      await deleteMessage(config.SECOND_QUEUE_URL, message.ReceiptHandle);
    }
  }
};

const startServer = async () => {
  await clearFile("output.txt");

  await clearFile("state.txt");

  enrichingService();
};

startServer();
