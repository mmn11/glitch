const express = require('express');
const app = express();
const bodyParser=require('body-parser')
const MongoClient= require('mongodb').MongoClient
const opn=require('opn')
const request=require('request')
const cheerio=require('cheerio')
var fs = require('fs');
const reqT = require("tinyreq")
var og = require('open-graph');


app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const mongoLink='mongodb://mm:12@ds141082.mlab.com:41082/mongopractice'
var db=

   
MongoClient.connect(mongoLink, (err,database)=>{
  db=database
  if(err) return console.log(err)
  console.log('connected')
  var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
})


var arrayL = []

app.get('/addReview', (req,res)=>{
    db.collection('urls').find().sort({_id:-1}).toArray(function(err, result){
//    console.log(result)
    res.render('reviews.ejs', {urls: result})
})})     

  
app.get('/author/*', (req,res)=>{
  console.log(req.params[0])
  var authorsearch={"$regex": req.params[0], }
//  var authorsearch="AP"  /^Julian/
  let query={}
  query["articleAuthor"]=authorsearch;
  console.log(authorsearch)
//  res.send(req.params[0])
  db.collection('urls').find({ "articleAuthor" : authorsearch }).sort({_id:-1}).toArray(function(err, result){
//    console.log(result)
//     var name = req.params.name;
// var value = req.params.value;
// var query = {};
// query[name] = value;
// collection.findOne(query, function (err, item) { ... });
    res.render('index.ejs', {urls: result})
  })})

app.get('/', (req, res)=> {
//  console.log(__dirname)
  db.collection('urls').find().sort({_id:-1}).toArray(function(err, result){
//    console.log(result)
    res.render('index.ejs', {urls: result})
  })})




app.post('/url', (req, res) => {
  db.collection('urls').save(req.body, (err,results)=>{
    if(err) return console.log(err)
  })
  console.log(req.body)
  res.redirect('/')
})

app.post('/newReview', (req, res)=>{

// opengraph info
  var url = req.body.urlName;
 
  og(url, function(err, meta){
    console.log(meta);
        db.collection('articles').save(meta,(err,results)=>{
    if(err) return console.log(err)
  })
  db.collection('articles').find().sort({_id:-1}).toArray(function(err, result){
   res.render('reviews.ejs',{articles:result}) 
  })
    
})
  
  //check for repeat articles?
  
//   let siteInput=req.body.urlName
//   console.log("urlName "+ siteInput)
//   //scraper
//   $=cheerio.load(req.body.urlName)
//   console.log($("h1.title").text())
  
//   function scrape(url, data, cb) {
//     reqT(url, (err, body) => {
//         if (err) { return cb(err); }
//         let $ = cheerio.load(body)
//           , pageData = {};
//         Object.keys(data).forEach(k => {
//             pageData[k] = $(data[k]).text();
//         });

//         // Send the data in the callback
//         cb(null, pageData);
//     });
// }
  
// //for different sites  
//   let site=siteInput.substring(8,20)
//   console.log(site)
  
  
// //cnbc  
//   if (site=="www.cnbc.com"){
//   scrape(req.body.urlName, {
//     title: "h1.title"
//   , source: ".sourcelogo"
//   , author: ".reporter-info"
//   , dateStamp: ".datestamp"
//   , articleBody: ".group"
// //  , urlName: req.body.urlName
// }, (err, data) => {
//     data.urlName=req.body.urlName
//     console.log(err || data);
//     db.collection('articles').save(data,(err,results)=>{
// //    db.collection('articles').save(req.body,(err,results)=>{
//     if(err) return console.log(err)
//   })
//   db.collection('articles').find().sort({_id:-1}).toArray(function(err, result){
//    res.render('reviews.ejs',{articles:result}) 
//   })
// });
//   }

// // yahoo fin
//   else if(site=="finance.yaho"){
//     scrape(req.body.urlName, {
//     title: ".canvas-header"
//   , source: ".provider-link"
//   , author: ".author-name"
//   , dateStamp: ".datestamp"
//   , articleBody: ".content"
// //  , urlName: req.body.urlName
// }, (err, data) => {
//     data.urlName=req.body.urlName
//     console.log(err || data);
//     db.collection('articles').save(data,(err,results)=>{
// //    db.collection('articles').save(req.body,(err,results)=>{
//     if(err) return console.log(err)
//   })
//   db.collection('articles').find().sort({_id:-1}).toArray(function(err, result){
//    res.render('reviews.ejs',{articles:result}) 
//   })
// });
//   }  
    
  
  
// else { 
//     //  db.collection('articles').save(req.body.urlName,(err,results)=>{
//     // if(err) return console.log(err)
//     // db.collection('articles').find().sort({_id:-1}).toArray(function(err, result){
//  //  res.render('reviews.ejs',{articles:result})
//   res.render('reviews.ejs')
//   // });
//   // })
  

//   }
  
})


