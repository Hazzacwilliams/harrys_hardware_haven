import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product:    { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity:   { type: Number, default: 1, min: 1 },
    price:      { type: Number, required: True }
});

const orderSchema = new mongoose.Schema({
    user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems:     [orderItemSchema],
    shipping:       {
        address:    String,
        city:       String,
        postal:     String,
        country:    String
    },
    paymentMethod:  String,
    paymentResult:  {
        id:         String,
        status:     String,
        update_time:String,
        email:      String
    },
    itemsPrice:     Number,
    taxPrice:       Number,
    shippingPrice:  Number,
    totalPrice:     Number,
    isPaid:         { type: Boolean, default: false },
    paidAt:         Date,
    isDelivered:    { type: Boolean, default: false },
    deliveredAt:    Date
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema);