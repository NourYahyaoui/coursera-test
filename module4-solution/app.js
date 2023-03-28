const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// Define the home route
app.get('/', (req, res) => {
  res.render('index');
});

// Define the about route
app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
