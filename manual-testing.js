const config = require("./configurations");
const { generateConversation, enrichConversation } = require("./conversation");
const { random, sleep, round } = require("./utils");
const { sendMessage } = require("./sqs");

const conversations = [
  { likes: 1, love: 3, haha: 7, angry: 8 },
  { likes: 5, love: 2, haha: 6, angry: 9 },
  { likes: 10, love: 4, haha: 5, angry: 11 },
];

const manualTesting = async () => {
  console.log(`Generating ${conversations.length} conversations!`);

  let sum = 0;

  for (let i = 0; i < conversations.length; i++) {
    const conversation = generateConversation(conversations[i]);

    const conversationEnriched = enrichConversation(conversation);

    sum += conversationEnriched.total_engagements;

    await sendMessage(config.FIRST_QUEUE_URL, conversation);

    await sleep(random(1000, 5000));
  }

  console.log(
    `Done, the result should be ${round(sum / conversations.length)}!`
  );
};

manualTesting();
