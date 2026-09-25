const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Recharge API
app.post("/recharge", async (req, res) => {
  try {
    const { number, operator, amount, circle } = req.body;

    if (!number || !operator || !amount || !circle) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing fields"
      });
    }

    const response = await axios.post(
      "https://api.pay2all.in/api/v1/recharge",
      {
        api_key: process.env.API_KEY,
        number,
        operator,
        amount,
        circle
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      status: "SUCCESS",
      data: response.data
    });

  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.response?.data || "Server Error"
    });
  }
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
