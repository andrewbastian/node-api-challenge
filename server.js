const express = require('express');

const projectRouter = require('./Routers/projectRouter');
const actionRouter = require("./Routers/actionRouter");

const server = express();

server.get('/', (req, res) => {
    res.send(`Server working`)
});

server.use(express.json());
server.use(logger);
server.use('/api/projects',projectRouter);
server.use('/api/actions', actionRouter);

function logger(req, res, next) {
	console.log(`[${new Date().toISOString()}] - ${req.method} - ${req.url} - ${req.get('User-Agent')}`)
	next()
}

server.use((err, req, res, next) => {
	res.status(500).json({
		message: 'Oops, something went wrong', err
	})
})

module.exports = server;
