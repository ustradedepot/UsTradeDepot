const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      shipAddress,
      shipCity,
      shipState,
      shipZip,
      shipCountry,
      billAddress,
      billCity,
      billState,
      billZip,
      billCountry,
      smsCode,
      paymentMethod
    } = req.body;

    await db.query(
      `INSERT INTO orders 
      (full_name, email, phone, ship_address, ship_city, ship_state, ship_zip, ship_country,
       bill_address, bill_city, bill_state, bill_zip, bill_country, sms_code, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName, email, phone,
        shipAddress, shipCity, shipState, shipZip, shipCountry,
        billAddress, billCity, billState, billZip, billCountry,
        smsCode, paymentMethod
      ]
    );

    res.status(200).json({ message: 'Order received successfully!' });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Server error while processing order' });
  }
});

module.exports = router;
