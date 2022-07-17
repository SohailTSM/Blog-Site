const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('listening to request on http://localhost:3000');
});

app.get('/', (req, res) {
    res.send('<h1>Home</h1>')
})