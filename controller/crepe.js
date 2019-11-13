const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const router = express.Router();

router.get("/api/scrape", (req, res) => {
    axios.get("https://www.pcgamer.com/news/").then(response => {
        const $ = cheerio.load(response.data);
        const results = [];
        $("div.listingResult.small").each(function (i, element) {
            const result = {};

            result.title = $(this).children("a").children("article").children("div").children("header").children("h3").text();
            result.summary = $(this).children("a").children("article").children("div").children("p").text();
            result.url = $(this).children("a").attr("href");
            result.img = $(this).children("a").children("article").children("div").children("figure").children("div").children("div").attr("data-original");

            db.Article.create(result)
                .then(dbArticle => console.log(dbArticle))
                .catch(err => console.log(err));

            results.push({ result });
        });
        console.log(results);
        res.send(results);
    }).catch(err => console.log(err));
});

router.get("/", (req, res) => {
    // res.render("home");
    db.Article.find({})
        .then(dbArticle => {
            const hbsObject = {
                articles: dbArticle
            };
            console.log("--------------------------------------")
            // console.log(hbsObject);
            res.render("home", hbsObject);
        })
        .catch(err => res.json(err));
});

router.get("/myarticles", (req, res) => {
    // res.render("myarticles");
    db.Article.find({})
        .then(dbArticle => {
            const hbsObject = {
                articles: dbArticle
            };
            console.log("--------------------------------------")
            // console.log(hbsObject);
            res.render("myarticles", hbsObject);
        })
        .catch(err => res.json(err));
});

router.delete("/api/all/remove", (req, res) => {
    db.Article.remove()
        .then(dbArticle => res.render("home"))
        .catch(err => console.log(err));
});

router.delete("/api/myarticles/remove/:id", (req, res) => {
    db.Article.remove({_id:req.params.id})
        .then(dbArticle => {
            const hbsObject = {
                articles: dbArticle
            };
            console.log("--------------------------------------")
            // console.log(hbsObject);
            res.render("myarticles", hbsObject);
        })
        .catch(err => res.json(err));
});

router.put("/api/update/:id", (req, res) => {
    db.Article.findOneAndUpdate({_id:req.params.id}, {saved: req.body.saved})
        .then(dbArticle =>  {
            const hbsObject = {
                articles: dbArticle
            };
            console.log("--------------------------------------")
            // console.log(hbsObject);
            res.render("home", hbsObject);
        })
        .catch(err => console.log(err));
});
module.exports = router;
