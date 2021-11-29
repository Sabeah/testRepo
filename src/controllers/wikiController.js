/* Implement authenticated routes to store,
 * get (all and by id), and update, and delete
 * wikipedia posts you will get calling wikipedia api
 * */
import wikiModel from "../models/wikiRecords";

export default {
    async insertWikiRecord(payload) {
        try {
            const result = await wikiModel.create(payload);
            return result;
        } catch (error) {
            return error;
        }
    },

    async getAllWikiRecords() {
        try {
            const response = await wikiModel.find();
            return response;
        } catch (error) {
            return error;
        }
    },

    async getWikiRecordById(id) {
        try {
            const response = await wikiModel.findOne({ _id: id });
            return response;
        } catch (error) {
            return error;
        }
    },
    async updateWikiRecords(id, payload) {
        try {
            const response = await model.updateOne({ _id: id }, { payload });
            return response;
        } catch (error) {
            return error;
        }
    },

    async deleteWikiRecord(id) {
        try {
            const response = await model.deleteOne({ _id: id });
            return response;
        } catch (error) {
            return error;
        }
    },
};
