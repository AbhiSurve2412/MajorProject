const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  inGameName: {
    type: String,
    required: true,
  },
  inGameId: {
    type: String,
    required: true,
  },
  ProfileImage: String,
  realName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  organisationName: String,
  contactInfo: {
    discord: { type: String, trim: true },
    instagram: { type: String, trim: true },
    youTube: { type: String, trim: true },
  },
  achievements: {
    seasonsInfo: [
      {
        seasonName: String,
        highestTierReached: String,
        kd: Number,
      },
    ],
    tournaments: [
      {
        tournamentName: String,
        date: Date,
        rank: String,
        organisationName: String,
        awards: [
          {
            awardName: String,
            description: String,
          },
        ],
      },
    ],
  },
  timeline: [
    {
      organisationName: String,
      role: String,
      from: Date,
      to: Date,
      description: String,
    },
  ],
  about: {
    type: String,
  },
});

module.exports = mongoose.model("Player", playerSchema);
 
