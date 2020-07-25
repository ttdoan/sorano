import mongoose, { Schema } from "mongoose";

const inventoryItemSchema = new Schema({
  product: {
    type: Array,
    default: [],
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    sellersList: {
      type: Array,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
});

const InventoryItem = mongoose.model(
  "InventoryItem",
  inventorySchema,
  "inventoryItems"
);
export default InventoryItem;
