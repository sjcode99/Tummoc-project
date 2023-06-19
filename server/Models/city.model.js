const { Schema, model } = require("mongoose");

//Schema/blueprint of city
const citySchema = new Schema(
    {
        name: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "user" }
    },
    { versionKey: false, timestamps: true }
);

//Collection of city
const CityModel = model("City", citySchema);

module.exports = CityModel;