const razorpay = require("../utils/razorpay");
const crypto = require("crypto");

const createOrder = async (req, res) => {
    try {

        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Razorpay uses paise
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json(order);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to create order"
        });

    }
};
const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;


        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;


        const expectedSignature =
            crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body.toString())
            .digest("hex");



        if(expectedSignature === razorpay_signature){

            return res.status(200).json({
                success:true,
                message:"Payment verified successfully"
            });

        }


        return res.status(400).json({
            success:false,
            message:"Invalid payment signature"
        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Payment verification failed"
        });

    }
};

module.exports = {
    createOrder,
    verifyPayment
};