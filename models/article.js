const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    unsaved: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "note"
    }
});

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;