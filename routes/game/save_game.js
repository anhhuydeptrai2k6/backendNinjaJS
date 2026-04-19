const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.use(express.json());

router.put('/save-game', async (req, res) => {
    const {id, level, x, y, mapId, aoId, quanId, yen, xu, luong, thuCuoiId} = req.body;

    if (!id) return res.status(400).send('Id nguoi dung khong duoc de trong');

    try {
        const [results] = await pool.query('UPDATE players SET x=?, y=?, mapId=?, aoId=?, quanId=?, yen=?, xu=?, luong=?, thuCuoiId=?, level=? WHERE id = ?', [x, y, mapId, aoId, quanId, yen, xu, luong, thuCuoiId, level, id]);
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