// List all Events
exports.EventAllResponse = async (event) => {
  let allEvents = { events: [] }

  event.forEach(eventObject => {  
    let singleEvent = { id: eventObject.id, name: eventObject.name };
    allEvents.events.push(singleEvent)
  });
  
  return allEvents 
}


// Event result
exports.EventResponse = async (event) => {
  const eventdates = event.EventDates;
  const votesArray = event.Votes;
  let getresult = { id: event.id, name: event.name, dates: eventdates, votes: [] }

  eventdates.forEach(eventdate => {
    let peoplePerDate = { date: "", people: [] }
    peoplePerDate.date = eventdate;

    votesArray.forEach(vote => {  
      if(vote.VoteDates.includes(eventdate)){
        peoplePerDate.people.push(vote.name);
      }
    });
    
    if(peoplePerDate.people.length) getresult.votes.push(peoplePerDate);
  });

  return getresult;
}

// Parse Result response
exports.EventResultResponse = async (event) => {
  let getresult = { id: event.id, name: event.name, suitableDates: [] }

  event.EventDates.forEach(date => {  
    let singleSuitable = { date: date, people: [] };
    event.Votes.forEach(vote => {
      if(vote.VoteDates.includes(date)){
        singleSuitable.people.push(vote.name)
      }
    });
    getresult.suitableDates.push(singleSuitable);
  });

  getresult.suitableDates = await getDateWithMostVotes(getresult.suitableDates)
  
  return getresult 
}

async function getDateWithMostVotes(dateRow){
  let mostVotes = { date: "", people: [] };

  dateRow.forEach(row => {
    if(row.people.length > mostVotes.people.length){
      mostVotes = row
    }
  });

  return [mostVotes].flat()
}