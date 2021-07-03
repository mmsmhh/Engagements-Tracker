const config = require("./configurations");

const {
  generateRandomConversation,
  enrichConversation,
} = require("./conversation");
const { random, sleep, round } = require("./utils");
const { sendMessage } = require("./sqs");

const numberOfconversations = 50;

const automaticTesting = async () => {
  console.log(`Generating ${numberOfconversations} conversations!`);

  let sum = 0;

  for (let i = 0; i < numberOfconversations; i++) {
    const conversation = generateRandomConversation();

    const conversationEnriched = enrichConversation(conversation);

    sum += conversationEnriched.total_engagements;

    await sendMessage(config.FIRST_QUEUE_URL, conversation);

    await sleep(random(1000, 5000));
  }

  console.log(
    `Done the result should be ${round(sum / numberOfconversations)}!`
  );
};

automaticTesting();
