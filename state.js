const { writeToFile, readFromFile, fileExists } = require("./fs");

const initState = async (totalEngagements) => {
  await writeToFile(
    "state.txt",
    JSON.stringify({ total: 1, sum: totalEngagements })
  );
};

const updateState = async (totalEngagements) => {
  if (!fileExists("state.txt")) {
    return await initState(totalEngagements);
  }

  const state = await getState();

  if (Object.keys(state).length < 1) {
    return await initState(totalEngagements);
  }

  const newState = {
    total: state.total + 1,
    sum: state.sum + totalEngagements,
  };

  return await writeToFile("state.txt", JSON.stringify(newState));
};

const getState = async () => {
  const state = await readFromFile("state.txt");
  return state.length === 0 ? {} : JSON.parse(state);
};

module.exports = { updateState, getState };
