const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.use(express.json());

router.post('/preview-player', async (req, res) => {
    const { characterIds } = req.body;

    try {
        if (!characterIds) {
            return res.status(400).send('Empty character list');
        }

        // giới hạn tối đa 3
        const ids = characterIds.slice(0, 3);

        const [rows] = await pool.query(
            `SELECT id, name, level, gioiTinh, kieuToc, aoId, quanId
             FROM players
             WHERE id IN (?)`,
            [ids]
        );

        return res.json(rows);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

module.exports = router;