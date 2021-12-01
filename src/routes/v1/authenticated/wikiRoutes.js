import express from "express";
import axios from "axios";
import errMessages from "../../../constants/errorMessages.js";
import wikiController from "../../../controllers/wikiController.js";

const wikiRoutes = express.Router();

const wikiUrl =
    "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&exintro=1&titles=";

wikiRoutes.post("/", async (req, res) => {
    try {
        const result = await wikiController.insertWikiRecord(req.body);
        return res.status(201).send({
            success: true,
            post: result,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            err: err.message || errMessages.errors.GENERIC_ERROR,
        });
    }
});

wikiRoutes.get("/search", async (req, res) => {
    try {
        const phrase = req.query.phrase;
        const res = await axios.get(`${wikiUrl}${phrase}`);
        const pageObj = res.data.query.pages;
        const pageId = Object.keys(pageObj)[0];
        const description = pageObj[pageId].extract;
        const title = pageObj.pageId.title;
        const payload = { phrase, title, description };

        const result = await wikiController.insertWikiRecord(payload);
        return res.status(200).send({
            success: true,
            posts: result,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            err: err.message || errMessages.errors.GENERIC_ERROR,
        });
    }
});

wikiRoutes.get("/", async (req, res) => {
    try {
        const result = await wikiController.getAllWikiRecords();
        return res.status(200).send({
            success: true,
            posts: result,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            err: err.message || errMessages.errors.GENERIC_ERROR,
        });
    }
});

wikiRoutes.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await wikiController.getWikiRecordById(id);
        return res.status(200).send({
            success: true,
            post: result,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            err: err.message || errMessages.errors.GENERIC_ERROR,
        });
    }
});

wikiRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await wikiController.deleteWikiRecord(id);
        return res.status(200).send({
            success: true,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            err: err.message || errMessages.errors.GENERIC_ERROR,
        });
    }
});

wikiRoutes.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await wikiController.updateWikiRecords(id, req.body);
        return res.status(204).send({
            success: true,
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            err: err.message || errMessages.errors.GENERIC_ERROR,
        });
    }
});

export default wikiRoutes;
