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

        const [countRows] = await pool.query(
            'SELECT COUNT(*) as total FROM players WHERE account_id = ?',
            [accountId]
        );

        if (countRows[0].total >= 3) {
            return res.status(400).send('Da dat gioi han 3 nhan vat');
        }

        const [result] = await pool.query(
            'INSERT INTO players (account_id, name, x, y, mapId, level, gioiTinh, kieuToc) VALUES (?, ?, 300, 400, "Tone", 1, ?, ?)',
            [accountId, name, gioiTinh, kieuToc]
        );

        const [playerRows] = await pool.query(
            'SELECT id, name, level, gioiTinh, kieuToc, aoId, quanId FROM players WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json(playerRows[0]);

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('Ten da ton tai');
        }

        console.error(error);
        res.status(500).send('Loi server');
    }
});

module.exports = router;