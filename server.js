const express = require('express');

const app = express();

const port = 5000;

app.get('/api/players', (req, res) => {
  const players = [
    {id: 1, firstName: 'Kobe', lastName: 'Bryant'},
    {id: 2, firstName: 'Steve', lastName: 'Kerr'},
    {id: 3, firstName: 'James', lastName: 'Harden'}
  ];
  res.json(players);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
})