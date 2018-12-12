const teamModel = require('../models/Team');

const createTeam = team => {
  return teamModel.create(team);
};

const updateTeam = (id, team) => {
  return teamModel.findByIdAndUpdate(id, team).exec();
};

const getTeamByName = (teamName) => {
  return teamModel.findOne({name: teamName}).exec();

};

const updateScore = (id, score) => {
  return findTeamById(id)
  .then(result => {
    let clone = JSON.parse(JSON.stringify(result));
    clone.score = score;
    return teamModel.findByIdAndUpdate(id, clone)
  })
};


const updateCoach = (teamId, coachId) => {
  return findTeamById(teamId)
  .then(result => {
    let clone = JSON.parse(JSON.stringify(result));
    clone.coach = coachId;
    return teamModel.findByIdAndUpdate(teamId, clone)
  })
};

const deleteTeam = id => {
  return teamModel.findByIdAndDelete(id).exec();
};


const addPlayerToTeam = (teamId, playerId) => {
  return teamModel.findByIdAndUpdate(
      teamId,
      {
        $addToSet: {
          players: playerId
        }
      },
      {new: true}
  ).exec();
};

const removePlayerFromTeam = (teamId, playerId) => {
  return teamModel.findByIdAndUpdate(
      teamId,
      {
        $pull: {
          players: playerId
        }
      },
      {new: true}
  ).exec();
};

const findAllTeams = () => {
  return teamModel.find().exec();
};

const findTeamById = id => {
  return teamModel.findById(id).exec();
};

module.exports = {
  createTeam,
  updateTeam,
  deleteTeam,
  findAllTeams,
  findTeamById,
  addPlayerToTeam,
  removePlayerFromTeam,
  updateCoach,
  getTeamByName,
  updateScore
};