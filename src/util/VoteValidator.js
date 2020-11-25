const { Event, Vote } = require('../models');

exports.checkEventDate = async (req) => {
  const result = { voteOK: true, errorMessage: "", Event: null};
  const EventId = req.params.id;
  const votedates = req.body.date
  const EventToVote = await Event.findByPk(EventId); 

  if(EventToVote){
    if(votedates.length){
      votedates.forEach(date => {
        if(!EventToVote.EventDates.includes(date)) {
          result.voteOK = false;
          result.errorMessage = `Vote date ${date} not found at event!`
        }
      });  
    } else {
      result.voteOK = false;
      result.errorMessage = "Please give a date to vote!"
    }
  } else {
    result.voteOK = false;
    result.errorMessage = "No Event found to give a vote!"
  }

  result.Event = EventToVote;
  return result
}
