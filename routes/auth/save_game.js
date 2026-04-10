const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.use(express.json());

router.put('/', async (req, res) => {
    const {username, x, y, mapId, aoId, quanId, yen, xu, luong} = req.body;

    if (!username) return res.status(400).send('Ten nguoi dung khong duoc de trong');

    try {
        const [results] = await pool.query('UPDATE users SET x = ?, y = ?, mapId = ?, aoId = ?, quanId = ?, yen = ?, xu = ?, luong = ? WHERE username = ?', [x, y, mapId, aoId, quanId, yen, xu, luong, username]);
        if (results.affectedRows === 0) {
            return res.status(404).send('Nguoi dung khong ton tai');
        }
        res.status(200).send('luu thanh cong');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server loi');
    }
});

module.exports = router;