const express = require('express');
const logger = require('./utils/logger');

const server = express();

server.all('/', (req, res) => {
  res.send('Bot is running!');
})

function keepAlive() {
  server.listen(3000, () => {
    logger.log('Server is ready');
  });
}

module.exports = keepAlive;