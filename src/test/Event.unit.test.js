const ResponseParser = require('../util/ResponseParser');


let EventToTest = {
  id: 1,
  name: 'kekkerit',
  EventDates: ['2020-12-19', '2020-12-18','2020-12-23','2020-12-22','2020-12-21','2020-12-24'],
  Votes: [
    { id: 1, name: 'Ville', VoteDates: [ '2020-12-24' ], EventId: 1 },
    { id: 2, name: 'Pekka', VoteDates: [ '2020-12-24' ], EventId: 1 },
    { id: 3, name: 'Jukka', VoteDates: [ '2020-12-24', '2020-12-21' ], EventId: 1 },
  ]
}

let EventResultResponse = {
  id: 1,
  name: "kekkerit",
  suitableDates: [
    {
      date: "2020-12-24",
      people: [
        "Pekka",
        "Jukka",
        "Ville"
      ]
    }
  ]
}

let EventResponse = {
  id: 1,
  name: "kekkerit",
  dates: [
    '2020-12-19', '2020-12-18','2020-12-23','2020-12-22','2020-12-21','2020-12-24'
  ],
  votes: [
    { 
      date: "2020-12-21",
      people: [
        "Jukka",
      ]
    },
    {
      date: "2020-12-24",
      people: [
        "Ville",
        "Pekka",
        "Jukka",
      ]
    }
  ]
}

let EventAllResponse = {
  "id": 1,
  "name": "kekkerit"
}

describe('Event controller', () => {
  test('Event result response: ', () => {
    ResponseParser.EventResultResponse(EventToTest)
    .then(value => {
      expect(value).toBe(EventResultResponse);
    });
  });

  test('Get event and Vote event result: ', () => {
    ResponseParser.EventResponse(EventToTest)
    .then(value => {
      expect(value).toBe(EventResponse);
    });
  });

  test('Event all response: ', () => {
    ResponseParser.EventAllResponse(EventToTest)
    .then(value => {
      expect(value).toBe(EventAllResponse);
    });
  });
});