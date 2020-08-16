const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(express.static('public'));
app.use(helmet());

const port = process.env.PORT || 4243;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});