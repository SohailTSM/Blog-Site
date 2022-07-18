const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv/config');

const app = express();

mongoose
  .connect(process.env.DB_CONNECTION, { dbName: 'Blog-Site' })
  .then((result) =>
    app.listen(3000, () => {
      console.log('listening to request on http://localhost:3000');
    })
  )
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
