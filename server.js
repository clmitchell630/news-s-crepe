const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// const db = require("./models");
const routes = require("./controller/crepe");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsCrepe";
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//comment out before testing
app.use(routes);

// ======test======
/*
app.get("/scrape", (req, res) => {
    axios.get("https://www.pcgamer.com/news/").then(response => {
        const $ = cheerio.load(response.data);
        const results = [];
        $("div.listingResult.small").each(function (i, element) {
            const result = {};

            result.title = $(this).children("a").children("article").children("div").children("header").children("h3").text();
            result.summary = $(this).children("a").children("article").children("div").children("p").text();
            result.url = $(this).children("a").attr("href");
            result.img = $(this).children("a").children("article").children("div").children("figure").children("div").children("div").attr("data-original");

            // db.Article.create(result)
            //     .then(dbArticle => console.log(dbArticle))
            //     .catch(err => console.log(err));
            results.push({ result });
        });
        console.log(results);
        res.send(results);
    }).catch(err => console.log(err));
});
*/

app.listen(PORT, () => console.log(`App running on: ${PORT}`));