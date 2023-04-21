const Product = require("../model/Product");
const Order = require("../model/Order");
const { checkPermissions } = require("../../utils");

const fakeStripeApi = async ({ amount, currency }) => {
  const client_secret = "somerandomvalue";
  return {
    client_secret,
    amount,
  };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    res
      .status(400)
      .json({ message: "bad requestError,no cart items provided" });
  }

  if (!tax || !shippingFee) {
    res.status(400).json({
      message: "bad requestError,please provide tax and shipping fee",
    });
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      return res.status(404).json({ msg: "item not found" });
    }

    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];

    //calculate subtotal
    subtotal += item.amount * price;
  }
  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripeApi({ amount: total, currency: "usd" });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.id,
  });
  res.status(201).json({
    msg: "order created successfully",
    clientSecret: order.clientSecret,
  });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json({ orders });
};

const getSingleOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findOne({ _id: id });

  if (!order) {
    return res
      .status(404)
      .json({ msg: "order with the given Id does not exist  " });
  }
  checkPermissions(req.user, order.user);
  res.status(200).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({ orders });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    return res.status(404).json({ msg: "order with this id does not exist" });
  }

  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(200).json({order})
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
