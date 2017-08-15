var mongoose =require("mongoose")
var Schema= mongoose.Schema

var urlSchema=Schema({
  originalURL:{type: String, required: true, max: 100},
  newURL:{type: String, required: true, max: 100},
  dateCreated:{type:Date}
})

// Virtual for URL
urlSchema
.virtual('url')
.get(function () {
  return '/catalog/url/' + this._id;
});

module.exports = mongoose.model("URL", urlSchema)