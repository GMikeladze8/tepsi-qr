const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const TG_TOKEN = '8671766446:AAFFB8qRo056m_uO7-rNeYpF7YNWqeFHmJ8';
const TG_CHAT_ID = '1887978471';

// დაცვა სპამისგან
const orderLimiter = rateLimit({
    windowMs: 30 * 1000, 
    max: 1,
    message: { success: false, message: "დაელოდეთ 30 წამი." }
});

app.post('/api/order', orderLimiter, async (req, res) => {
    const { item, table, price, customerName } = req.body;
    const message = `🚀 *ახალი შეკვეთა!*\n━━━━━━━━━━━━━━\n👤 სტუმარი: *${customerName || 'ანონიმი'}*\n📦 პროდუქტი: *${item}*\n💰 ფასი: *${price}*\n📍 მაგიდა: *#${table}*\n━━━━━━━━━━━━━━\n✅ გთხოვთ დაამუშავოთ!`;

    try {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: 'Markdown' }) 
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server LIVE on ${PORT}`));
