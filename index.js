const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const initSockets = require('./sockets');
const bindRoutes = require('./routers');
const { init } = require('express/lib/application');

dotenv.config();
const PORT = process.env.PORT || '3004';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
console.log(FRONTEND_URL);
const app = express();

const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: FRONTEND_URL,
		methods: ['GET', 'POST'],
	},
});

initSockets(io);

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '2mb' }));
app.use(express.static('public'));

bindRoutes(app);

app.get('/test', (req, res) => res.json({ msg: 'hellowrld' }));

server.listen(PORT, () => console.log(`listening @ ${PORT}`));
