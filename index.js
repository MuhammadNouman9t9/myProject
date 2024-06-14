const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('form');
});

app.post('/submit', (req, res) => {
  const formData = req.body;
  res.send(`Form submitted successfully!<br>Received data: ${JSON.stringify(formData)}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
