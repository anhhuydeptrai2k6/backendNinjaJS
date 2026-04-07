const express = require('express');
const app = express();
const loginRoutes = require('./routes/auth/login');
const registerRoutes = require('./routes/auth/register');
const saveRoutes = require('./routes/auth/save_game');

app.use(express.json());

app.use('/auth/login', loginRoutes);
app.use('/auth/register', registerRoutes);
app.use('/auth/save-game', saveRoutes);

app.listen(8080, () => {
    console.log('Server dang chay o cong 8080');
});