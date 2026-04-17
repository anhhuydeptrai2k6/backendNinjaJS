const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).send('Vui long dien day du thong tin');
        }
        const [rows] = await pool.query('SELECT * FROM accounts WHERE username = ?', [username]);
        if (rows.length > 0) {
            return res.status(400).send('Ten dang nhap da ton tai');
        }
        const[result] = await pool.query('INSERT INTO accounts (username, password) VALUES (?, ?);', [username, password]);
        const accountId = result.insertId;
        await pool.query('INSERT INTO players (account_id, x, y, mapId, level) VALUES (?, 300, 400, "Tone", 1);', [accountId]);
        res.status(201).send('Dang ky thanh cong');
    } catch (error) {
        console.error(error);
        res.status(500).send('Loi server');
    }
});

module.exports = router;