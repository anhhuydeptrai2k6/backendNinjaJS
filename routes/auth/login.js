const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        const user = rows[0];
        if (!user) {
            return res.status(401).send('Thong tin dang nhap khong chinh xac');
        }
        if (user.password !== password) {
            return res.status(401).send('Thong tin dang nhap khong chinh xac');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Loi server');
    }
});

module.exports = router;