
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); 

//get function has 2 parameter
// app.get(parameter1,parameter2);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req,res) {
     console.log("Data succesful");
      
      const query = req.body.cityName;
      const apiKey = "6068b78d339c0f1549cdfd553404059d";
      const unit = "metric";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

      https.get(url, function (response) {
        //check response status code
        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        console.log(response.statusCode);

        response.on("data", function (data) {
          //look data
          console.log(data);
          //syntax JSON.parse() , for convert data to JSON
          const weatherData = JSON.parse(data);
          //console.log(weatherData);
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const icon = "http://openweathermap.org/img/wn/01d@4x.png";
          console.log(temp); //29.41
          console.log(weatherDescription); //overcast clouds
          res.write(
            `<h1>The weather is currently: ${weatherDescription} </h1>`
          );
          res.write(
            `<h1>The temperature in ${query}: ${temp} degree celcius</h1>`
          );
          res.write(`<img src="${icon}">`);
          res.send();
          //   res.send(`<h1>The temperature in london" ${temp} "degree celcius</h1> <h1>The weather is currently: ${weatherDescription} </h1>`);
        });
      });
})



/* 

  //   res.send("Server is up and running");

 */
app.listen(3000, function () {
  console.log("my server port 3000");
});
