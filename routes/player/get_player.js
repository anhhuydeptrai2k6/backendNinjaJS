const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.use(express.json());

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        if (!id) {
            return res.status(400).send('Khong duoc de trong id');
        }

        const [rows] = await pool.query('SELECT * FROM players WHERE id = ?', [id]);

        const player = rows[0];
        if (!player) {
            return res.status(404).send('Khong tim thay nhan vat');
        }

        return res.json(player);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server loi');
    }
});

module.exports = router;