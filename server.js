const express = require('express');

const projectsRouter = require('./projectsRouter.js');
const actionsRouter = require('./actionsRouter.js');

const server = express()

server.use(express.json());

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

module.exports = server;
