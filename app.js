const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
  const query=req.body.cityname;
  const apiKey="0fd4cc6bb9dd56e00394fcf5829bb45c";
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      const temp=weatherdata.main.temp;
      const weatherdesc=weatherdata.weather[0].description
      const icon=weatherdata.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"

      // console.log(temp);
      // console.log(weatherdesc);


      res.write("<h1>The temperature in "+query+" "+temp+" degree celcius</h1>");
      res.write("<p>The weather currently looks like "+ weatherdesc+"</p>");
      res.write("<img src="+imageURL+">")
      res.send();

    })
  });

});


app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
