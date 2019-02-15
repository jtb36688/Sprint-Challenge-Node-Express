const express = require('express');
const projectsRouter = require('./projectsRouter');
const actionsRouter = require('./actionsRouter');

const server = express()

server.use(express.json());
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

module.exports = server;
