const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const initSockets = require('./sockets');
const bindRoutes = require('./routers');
const middleware = require('./middleware');

dotenv.config();
const PORT = process.env.PORT || '3004';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const app = express();

const whitelist = [FRONTEND_URL]
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1){
      callback(null, true)
    } else {
      callback(new Error("Not allowed by cors"))
    }
  },
  credentials: true
}

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: FRONTEND_URL,
		methods: ['GET', 'POST'],
	},
});

initSockets(io);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '2mb' }));
app.use(express.static('public'));

bindRoutes(app);

app.use(middleware.errorHandler);

server.listen(PORT, () => console.log(`listening @ ${PORT}`));
