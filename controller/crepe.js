const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const router = express.Router();
const $ = cheerio.load(response.data);

router.get("/api/scrape", (req, res) => {
    axios.get("https://www.pcgamer.com/news/").then(response => {
        $("listingResults news").each(function (i, element) {
            const result = {};

            result.title = $(this).children("a").children("article").children("div").children("header").children("h3").text();
            result.summary = $(this).children("a").children("article").children("div").children("p").text();
            result.url = $(this).children("a").attr("href");
            result.img = $(this).children("a").children("article").children("div").children("figure").children("div").children("div").attr("data-original");

            db.Article.create(result)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));
        });
        res.send("Scrape Complete");
    }).catch(err => console.log(err));
});

router.get("/", (req, res) => {
    db.Article.find({})
        .then(dbArticle => res.json(dbArticle))
        .catch(err => res.json(err));
});

