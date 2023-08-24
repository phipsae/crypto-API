import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://api.coingecko.com/api/v3/";

const boring = ["bitcoin", "ethereum" ,"cosmos"]
const moon = ["defichain"];
var status = "normal";
var cryptos;
var cryptosfilter;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    console.log(status);
    if (status === "normal") {
        cryptos = boring;
        cryptosfilter = "bitcoin,ethereum,cosmos"
    } else {
        cryptos = moon;
        cryptosfilter = "defichain"
    }
    try {
        const response = await axios.get(`${API_URL}/simple/price?ids=${cryptosfilter}&vs_currencies=eur`);
        const result = response.data;
        res.render("index.ejs", { content: result, cryptos: cryptos, status: status });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {content: error.message });
    }
  });

app.post("/", (req, res) => {
    
    status = req.body.status;
    console.log(status);
    res.redirect("/");
});  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  