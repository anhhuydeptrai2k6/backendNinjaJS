const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            return res.status(400).send('Ten dang nhap da ton tai');
        }
        await pool.query('INSERT INTO users (username, password, x, y, mapId, aoId, quanId) VALUES (?, ?, 300, 400, "Tone", "ao_0x", "quan_0x")', [username, password]);
        res.status(201).send('Dang ky thanh cong');
    } catch (error) {
        console.error(error);
        res.status(500).send('Loi server');
    }
});

module.exports = router;