import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//for fan control
app.post("/fan", async (req, res) => {
  console.log(req.body);

  //data to be sent through the API

  const jsonData = {
    teamid: "Kh14XK0",
    device: `${req.body.device}`,
    value: req.body.value,
  };
  let status = "ON";
  if (req.body.value > 0) {
    status = "OFF";
  }

  const statusData = {
    fanSpeed: req.body.value,
    fanStatus: status,
  };

  const apiUrl = "https://kodessphere-api.vercel.app/devices";

  axios
    .post(apiUrl, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  res.render("index.ejs", statusData);
});


//for bulb
app.post("/bulb", async (req, res) => {
  console.log(req.body);
  //data to be sent through the API

  const jsonData = {
    teamid: "Kh14XK0",
    device: `${req.body.device}`,
    value: req.body.value,
  };

  let bulbStatus = "OFF";
  if (req.body.value == 1) bulbStatus = "ON";
  const statusData = {
    bulb: bulbStatus,
  };

  const apiUrl = "https://kodessphere-api.vercel.app/devices";

  axios
    .post(apiUrl, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  res.render("index.ejs", { data: statusData });
});

//for  led 
app.post("/LED", async (req, res) => {
  console.log(req.body);

  //data to be sent through the API

  const jsonData = {
    teamid: "Kh14XK0",
    device: `${req.body.device}`,
    value: req.body.value,
  };

  let ledStatus = "OFF";
  if (req.body.value) ledStatus = "ON";
  const statusData = {
    led: ledStatus,
    color: req.body.value,
  };

  const apiUrl = "https://kodessphere-api.vercel.app/devices";

  axios
    .post(apiUrl, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  res.render("index.ejs", statusData );
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
