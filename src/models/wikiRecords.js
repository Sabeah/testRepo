import mongoose from "mongoose";

const WikiSchema = new mongoose.Schema(
    {
        phrase: { type: String },
        title: { type: String },
        description: { type: String },
    },
    { timestamps: true }
);

const WikiModel = mongoose.model("Wiki", WikiSchema);
export default WikiModel;
