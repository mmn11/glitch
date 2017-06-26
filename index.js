var express= require('express')
var app = express()


app.get('*', function (req, res) {
  var urlParam=req.params[0]
  urlParam=urlParam.split("")
  var cleanParm="" ;
  for(var i=1; i<urlParam.length;i++){
  cleanParm=cleanParm+urlParam[i]  
  }
  var uptime=new Date()
 uptime.setTime(cleanParm)
  

    var natDate=Date.parse(cleanParm)
var month=new  Array()
  month[1]='January'
  month[2]='February'
  month[3]='March'
  month[4]='April'
  month[5]='May'
  month[6]='June'
  month[7]='July'
  month[8]='August'
  month[9]='September'
  month[10]='October'
  month[11]='November'
  month[12]='December'

    function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

  if (isNumeric(cleanParm)){
//    uptime.setFullYear(uptime)
    console.log(month[parseInt(uptime.getMonth())+1])
    res.end('unix:'+ cleanParm+ "    natural:"+month[parseInt(uptime.getMonth())+1]+ ", " + uptime.getDay() + ", "+uptime.getYear())
  }

 else if(cleanParm!=""){

    if (!isNumeric(natDate)){
      res.end('unix:'+natDate+ "    natural:NaN")
    }
  else{ res.end('unix:'+natDate+ "    natural:"+cleanParm)}
 }
 
  
  
  res.send('waiting for your time input in the url example https://coral-catamaran.glitch.me/123455 or https://coral-catamaran.glitch.me/Dec,12,1999...')
})


app.listen(process.env.PORT), function () {
    console.log('Node.js listening ...');
  };