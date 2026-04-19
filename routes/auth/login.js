const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.use(express.json());

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).send('Vui long dien day du thong tin');
        }

        // 1. check account
        const [accRows] = await pool.query('SELECT id, username, password FROM accounts WHERE username = ?', [username]);

        const account = accRows[0];
        if (!account) {
            return res.status(401).send('Thong tin dang nhap khong chinh xac');
        }

        if (account.password !== password) {
            return res.status(401).send('Thong tin dang nhap khong chinh xac');
        }

        // 2. lấy list nhân vật thuộc account
        const [charRows] = await pool.query('SELECT id FROM players WHERE account_id = ?', [account.id]);

        const characterIds = charRows.map(c => c.id);

        return res.json({
            accountId: account.id,
            username: account.username,
            characters: characterIds
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Loi server');
    }
});

module.exports = router;