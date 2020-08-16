const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(express.static('public'));
app.use(helmet());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const port = process.env.PORT || 4243;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});