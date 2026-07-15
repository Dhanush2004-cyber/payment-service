require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        service: process.env.APP_NAME,
        status: "Running"
    });

});

app.post("/api/payment", (req, res) => {

    const {

        orderId,
        customerName,
        amount,
        paymentMethod

    } = req.body;

    if (!orderId || !customerName || !amount || !paymentMethod) {

        return res.status(400).json({

            success: false,
            message: "Missing required fields"

        });

    }

    res.json({

        success: true,

        transactionId: "TXN" + Date.now(),

        orderId,

        customerName,

        amount,

        paymentMethod,

        paymentStatus: "SUCCESS",

        branch: "main"

    });

});

const PORT = process.env.PORT;

app.listen(PORT, () => {

    console.log(`${process.env.APP_NAME} running on port ${PORT}`);

});