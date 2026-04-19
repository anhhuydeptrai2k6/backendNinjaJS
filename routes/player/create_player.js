const express = require("express");
const pool = require('../../db');
const router = express.Router();

router.use(express.json());

router.post('/create-character', async (req, res) => {
    const { accountId, name, gioiTinh, kieuToc } = req.body;

    try {
        if (!accountId || !name) {
            return res.status(400).send('Thieu du lieu');
        }

        const [rows] = await pool.query('SELECT COUNT(*) as total FROM players WHERE account_id = ?', [accountId]);

        if (rows[0].total >= 3) {
            return res.status(400).send('Da dat gioi han 3 nhan vat');
        }

        await pool.query('INSERT INTO players (account_id, name, x, y, mapId, level, gioiTinh, kieuToc) VALUES (?, ?, 300, 400, "Tone", 1, ?, ?)', [accountId, name, gioiTinh, kieuToc]
        );

        res.status(201).send('Tao nhan vat thanh cong');

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('Ten da ton tai');
        }

        console.error(error);
        res.status(500).send('Loi server');
    }
});

module.exports = router;