const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/order', async (req, res) => {
    const { item, table } = req.body;
    const message = `🚀 ახალი შეკვეთა!\n📦 მაგიდა: ${table}\n🍕 პროდუქტი: ${item}`;
    
    fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TG_CHAT_ID, text: message })
    });
    res.json({ success: true });
});

app.listen(process.env.PORT || 3000);
