const uuid = require("uuid");
const { random } = require("./utils");

const generateRandomConversation = () => {
  return {
    id: uuid.v4(),
    organization_id: "601a6fc90638651eff8350a8",
    type: "post",
    source: "facebook",
    link: "https://facebook.com/fake-post",
    username: "faker fake",
    engagements: {
      likes: random(0, 100),
      love: random(0, 100),
      haha: random(0, 100),
      angry: random(0, 100),
    },
  };
};

const generateConversation = ({ likes, love, haha, angry }) => {
  return {
    id: uuid.v4(),
    organization_id: "601a6fc90638651eff8350a8",
    type: "post",
    source: "facebook",
    link: "https://facebook.com/fake-post",
    username: "faker fake",
    engagements: {
      likes,
      love,
      haha,
      angry,
    },
  };
};

const enrichConversation = (conversation) => {
  conversation.total_engagements =
    conversation.engagements.likes +
    conversation.engagements.love +
    conversation.engagements.haha +
    conversation.engagements.angry;

  return conversation;
};

const shouldConversationEnriched = (conversation) => {
  const organizations = {
    "601a6fc90638651eff8350a8": true,
  };

  return organizations[conversation.organization_id];
};

module.exports = {
  generateRandomConversation,
  generateConversation,
  enrichConversation,
  shouldConversationEnriched,
};
