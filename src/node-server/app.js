const express = require('express');
const faker = require('faker');
const _ = require('lodash');
const app = express();
let meetings;

app.use(express.json());

meetings = _.times(10, (i) => {
  return {
    id: i + 1,
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    date: faker.date.future(),
    reason: faker.random.words(6)
  };
});

/**
 * Get the list of meetings
 */
app.get('/summary', (req, res) => {
  res.json({
    statusCode: 200,
    statusMessage: 'SUCCESS',
    data: meetings
  });
});

/**
 * Get meeting by id
 */
app.get('/summary/:id', (req, res) => {
  let meeting;
  for(const item of meetings) {
    if (item.id === parseInt(req.params.id, 10)) {
      meeting = item;
      break;
    } else {
      meeting = {}
    }
  }

  res.json({
    statusCode: 200,
    statusMessage: 'SUCCESS',
    data: meeting
  });
});

/**
 * Create a new meeting
 */
app.post('/meeting', (req, res, next) => {
  const listLength = meetings.length;
  req.body.id = listLength + 1;
  res.json({
    statusCode: 200,
    statusMessage: 'SUCCESS',
    data: req.body
  });
  meetings.push(req.body);
})

// const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, (req, res) => {
  console.log(`Express API running at port ${port}...`);
});
