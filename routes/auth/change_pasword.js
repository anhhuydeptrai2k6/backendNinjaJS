const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.use(express.json());

router.put('/change-password', async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        if (!username || !oldPassword || !newPassword) {
            return res.status(400).send('Vui long dien day du thong tin');
        }
        const [rows] = await pool.query('SELECT * FROM accounts WHERE username = ?', [username]);
        const user = rows[0];
        if (!user) {
            return res.status(404).send('Tai khoan khong ton tai');
        }
        if (user.password !== oldPassword) {
            return res.status(400).send('Mat khau cu khong chinh xac');
        }
        if (user.password === newPassword) {
            return res.status(400).send('Mat khau moi phai khac mat khau cu');
        }
        await pool.query('UPDATE accounts SET password = ? WHERE username = ?', [newPassword, username]);
        res.status(200).send('Doi mat khau thanh cong');
    }catch (error) {
        console.error(error);
        res.status(500).send('Loi server');
    }
});

module.exports = router;