# Engagements Tracker

## Installation

Create `.env` file with the following content

```sh
AWS_SECRET_ACCESS=
AWS_ACCESS_KEY=
AWS_REGION=
FIRST_QUEUE_URL=
SECOND_QUEUE_URL=
```

then run following command to install dependencies

```sh
yarn install
```

after that start the Enriching Service by running the following command

```sh
yarn start
```

then open another terminal and choose between manual and automatic testing.

## Automatic Testing

Send random generated conversations, you can change the number of conversations by updating the `numberOfconversations` variable in the `automatic-testing.js` file.

default:

```sh
const numberOfconversations = 5;
```

To start the automatic-testing run the following command

```sh
yarn automatic-testing
```

## Manual Testing

Send manual generated conversations, you can change the engagements and the number of conversations by updating the `conversations` variable array in the `manual-testing.js` file.

default:

```sh
const conversations = [
  { likes: 1, love: 3, haha: 7, angry: 8 },
  { likes: 5, love: 2, haha: 6, angry: 9 },
  { likes: 10, love: 4, haha: 5, angry: 11 },
]
```

To start the manual-testing run the following command

```sh
yarn manual-testing
```

## Clear Queues

it's recommended to clear queues before running automatic or manual testing to get accurate results

to clear all the queues run the following command

```sh
yarn clear-queues
```
