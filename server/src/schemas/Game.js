const Schema = require('mongoose').Schema;
const TeamModel = require('../models/Team');
const UserModel = require('../models/User');

module.exports = new Schema({
    start: Date,
    location: String,
    gameType: String,
    teams: [
        {
            team: {
                type: Schema.Types.ObjectId,
                ref: TeamModel
            },
            score: {
                type: Number,
                default: 0
            }
        }
    ],
    manager: {
        type: Schema.Types.ObjectId,
        ref: UserModel
    },
    isOver: Boolean
}, {collection: 'game'});