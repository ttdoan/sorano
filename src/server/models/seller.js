import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  inventory: {
    type: Array,
    default: [],
  },
});

const Seller = mongoose.model("Seller", sellerSchema, "sellers");
export default Seller;
