const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./user");

const needsSchema = new Schema({
  needTitle: { 
  	type: String, 
  	required: true 
  },
  needNote: { 
  	type: String, 
  	required: true ,
  	imageurl: String
  },
  needDate: { 
  	type: Date, 
  	default: Date.now 
  },
  user: {
	  type: Schema.Types.ObjectId, ref: 'User'
  }
});

const Needs = mongoose.model("Needs", needsSchema);

module.exports = Needs;