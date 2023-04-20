const mongoose = require("mongoose");

const SingleCartItemSchema = mongoose.Schema({
    name : {type:String ,required:true},
    Image : {type:String ,required:true},
    Price : {type:Number ,required:true},
    amount : {type:Number ,required:true}, 
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true, 
    }
})

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    cartItems: [SingleCartItemSchema],
    Status :{
        type:String,
        enum:['pending','failed' ,'delivered','canceled']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
