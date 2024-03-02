const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    organizationName : {
        type : String,
        required : true
    },
    founderUserName : {
        type : String,
        required : true
    },
    establishDate : {
        type : Date,
        required : true
    },
    profileImage : {
        type : String,
    },
    achievements: {
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
    about : {
        type : String,
        required : true
    },
    peoples : {
        type : Schema.Types.ObjectId,
        ref : "Player"
    },
});
module.exports = mongoose.model("Organizations", organizationSchema);