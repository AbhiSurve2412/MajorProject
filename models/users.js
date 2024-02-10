const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    email: { type: email, trim: true ,required : true },
    discord: { type: String, trim: true ,required : true},
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
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
