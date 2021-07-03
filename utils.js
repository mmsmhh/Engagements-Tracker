const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function round(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

module.exports = { random, sleep, round };
