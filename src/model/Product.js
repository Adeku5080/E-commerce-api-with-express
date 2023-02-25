const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a product name"],
    maxLength: [100, "Name cannot be more than 100 characters"],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "Please product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    maxLength: [1000, "Name cannot be more than 1000 characters"],
  },
  image: {
    type: String,
    default: "/upload/examplec.jpeg",
  },
  category: {
    type: String,
    required: [true, "Please provide a product category"],
    enum: ["office", "Kitchen", "bedroom"],
  },
  company: {
    type: String,
    required: [true, "Please provide a product company"],
    enum: {
      values: ["ikea", "liddy", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
  colors: {
    type: [String],
    required: true,
    default:['#222']
  },
  featured: {
    type: Boolean,
    default: false,
  },
  freeShipping: {
    type: Boolean,
    default: false,
  },
  inventory: {
    type: Number,
    required: true,
    default: 15,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model("Product", ProductSchema);
