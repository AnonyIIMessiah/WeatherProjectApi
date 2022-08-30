const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  // res.send("Running");
  res.sendFile(__dirname+"/index.html");
})
// https.get("https://api.openweathermap.org/data/2.5/weather?q=Lucknow&units=metric&appid=29caf042baa2daa70f6c8821f8501c56#",function(response){
//   // console.log(response.statusCode);
//   response.on("data",function(data){
//     console.log(data);//give resule in hexa decimal
//     //to get it in JSON format we will parse interval
//     const weatherData=JSON.parse(data);
//     console.log(weatherData);
//     //to get this data in a string
//     console.log(JSON.stringify(weatherData));
//     //to access a particular data element in the given JSON
//     const temp=weatherData.main.temp;
//     console.log(temp);
//     console.log(weatherData.weather[0].description);
//     console.log(weatherData.main.feels_like);
//     const icon =weatherData.weather[0].icon;
//     const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
//
//     //to send this data to the browser then we will have to send it through the res
//     // res.send("<h1>The temp is "+temp+" degree celsius</h1>");
//     //to get multiple data as an output
//     res.write("<h1>The temp is "+temp+" degree celsius</h1>");
//     res.write("<h1>The weather  is "+weatherData.weather[0].description+" degree celsius</h1>");
//     res.write("<img src="+imageURL+">");
//     res.send();
//   })
// })
app.post("/",function(req,res){
  console.log(req.body.cityName);
  const city=req.body.cityName;
  https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=29caf042baa2daa70f6c8821f8501c56#",function(response){
    // console.log(response.statusCode);
    response.on("data",function(data){
      console.log(data);//give resule in hexa decimal
      //to get it in JSON format we will parse interval
      const weatherData=JSON.parse(data);
      console.log(weatherData);
      //to get this data in a string
      console.log(JSON.stringify(weatherData));
      //to access a particular data element in the given JSON
      const temp=weatherData.main.temp;
      console.log(temp);
      console.log(weatherData.weather[0].description);
      console.log(weatherData.main.feels_like);
      const icon =weatherData.weather[0].icon;
      const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";

      //to send this data to the browser then we will have to send it through the res
      // res.send("<h1>The temp is "+temp+" degree celsius</h1>");
      //to get multiple data as an output
      res.write("<h1>The temp is "+temp+" degree celsius</h1>");
      res.write("<h1>The weather  of "+city+" is "+weatherData.weather[0].description+" degree celsius</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  })
})
app.listen(3000,function(){
  console.log("running at 3000");
})
