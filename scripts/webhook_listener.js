const express = require('express');
const app = express();

const PORT = process.env.PORT || 80;

class WebhookListener {
  listen() {
    app.listen(PORT);
  }
}

const listener = new WebhookListener();
listener.listen();

module.exports = listener;