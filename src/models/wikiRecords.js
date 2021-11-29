import mongoose from "mongoose";

const wikiSchema = new mongoose.Schema(
    {
        phrase: { type: String },
        description: { type: String },
    },
    { timestamps: true }
);

const wikiModel = mongoose.model("User", wikiSchema);
export default wikiModel;
