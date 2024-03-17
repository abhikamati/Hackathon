import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
  //   try {
  //     const response = await axios.get("https://kodessphere-api.vercel.app/divices/Kh14XK0");
  //     const result = await response.data;
  //     console.log(result);
  //     // res.render("index.ejs", { data: result });
  //   } catch (error) {
  //     console.error("Failed to make request:", error.message);
  //     res.render("index.ejs", {
  //       error: error.message,
  //     });
  //   }
});

app.post("/", async (req, res) => {
  console.log(req.body);
//   const jsonData = {
//     teamid: "Kh14XK0",
//     device: `${req.body.devices}`,
//     value: req.body.value,
//   };
  const jsonData = {
    teamid: "Kh14XK0",
    device: `${req.body.devies}`,
    value: req.body.value,
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

    res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


