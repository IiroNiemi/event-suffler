const { Event, Vote } = require('../models');
const ResponseParser = require('../util/ResponseParser');
const VoteValidator = require('../util/VoteValidator')


// GET: Get event by id
exports.event_id_get = async (req, res) => {
  const event = await Event.findOne({
    where: { id: req.params.id },
    include: [Vote]
  })
  if(event){
    res.status(200).json( await ResponseParser.EventResponse(event));
  } else {
    res.status(404).json("Event not found!")
  }
}

// GET: List all events
exports.event_all_get = async (req, res) => {
  const event = await Event.findAll({ 
    include: [Vote] 
  })
  if(event){
    res.status(200).json( await ResponseParser.EventAllResponse(event));
  } else {
    res.status(404).json("Events not found!")
  }
}

// GET: Get event vote results for everyone
exports.event_results_get = async (req, res) => {
  const event = await Event.findByPk(req.params.id, { include: [Vote] })
  const result = await ResponseParser.EventResultResponse(event)
  res.status(200).json(result)
}

// POST: Create new event
exports.event_create_post = async (req, res) => {
  await Event.create({ 
    name: req.body.name, 
    EventDates: req.body.dates })
  .then( value => {
    res.status(201).json({ id: value.id })
  }).catch(err => {
    res.status(404).json(err)
  });

}

// POST: a vote to event
exports.event_vote_post = async (req, res) => {
  const validationResult = await VoteValidator.checkEventDate(req);
 
  if(validationResult.voteOK){
    const validEvent = validationResult.Event; 
    const newVote = await Vote.create({
      name: req.body.name,
      VoteDates: req.body.date
    })
    
    await validEvent.addVote(newVote); // Returns old model unfortunately
    const updatedEvent =  await Event.findByPk(validEvent.id, {include: [Vote]}); // That's why we have to query updated event again here.
    
    res.status(201).json(await ResponseParser.EventResponse(updatedEvent))   
  } else {
    res.status(404).json(validationResult.errorMessage)
  }
}
