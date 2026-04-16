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
        const [rows] = await pool.query('SELECT a.id, a.username, a.password, p.x, p.y, p.mapId, p.aoId, p.quanId, p.thuCuoiId, p.yen, p.xu, p.luong FROM accounts a JOIN players p ON a.id = p.account_id WHERE a.username = ?', [username]);

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