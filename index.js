const express = require('express');
const app = express();
const loginRoutes = require('./routes/auth/login');
const registerRoutes = require('./routes/auth/register');
const changePasswordRoutes = require('./routes/auth/change_pasword');

const createRoutes = require('./routes/player/create_player');
const getPlayerRoute = require('./routes/player/get_player');
const getPreviewRoute = require('./routes/player/preview_player');

const saveRoutes = require('./routes/game/save_game');

app.use(express.json());

app.use('/auth', loginRoutes);
app.use('/auth', registerRoutes);
app.use('/auth', changePasswordRoutes);

app.use('/player', createRoutes);
app.use('/player', getPlayerRoute);
app.use('/player', getPreviewRoute);

app.use('/game', saveRoutes);
 
app.listen(8080, () => {
    console.log('Server dang chay o cong 8080');
});