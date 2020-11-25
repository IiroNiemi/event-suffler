const { DataTypes } = require('sequelize');
const instance = require('../index');

const Event = instance.sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  EventDates: {
    type: DataTypes.ARRAY(DataTypes.DATEONLY,),
    validate: {
      isArrayDatesUnique: function(EventDates) {
        EventDates.forEach((date, index) => { if (EventDates.indexOf(date) !== index) throw new Error("Event dates must be unique!") });
      } 
    }
  },
}, {timestamps: false});

const Vote = instance.sequelize.define('Vote', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  VoteDates: {
    type: DataTypes.ARRAY(DataTypes.DATEONLY,),
    validate: {
      isArrayDatesUnique: function(VoteDates) {
        VoteDates.forEach((date, index) => { if (VoteDates.indexOf(date) !== index) throw new Error("Vote dates must be unique!") });
      }
    }
  },
}, {timestamps: false});

// const EventVotes = instance.sequelize.define('EventVotes', {
//   EventId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Event
//     }
//   },
//   VoteId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Vote
//     }
//   },
  
  
// }, {timestamps: false});

exports.Event = Event;
exports.Vote = Vote;
// exports.EventVotes = EventVotes;