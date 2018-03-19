const express = require('express');
const router = express.Router();

// Bring in Article Models
const Article = require('../models/article');

// Bring in User Models
const User = require('../models/user');

// Add Article Route
router.post('/add', (req, res) => {
  let article = new Article();
  article.userId = req.body.userId;
  article.title = req.body.title;
  article.description = req.body.description;
  article.url = req.body.url;
  article.img = req.body.img;

  const query = {
    userId: req.body.userId,
    title: req.body.title
  };
  let articleSaved = false;

  Article.findOne(query, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      if (article) {
        articleSaved = true;
      }  
    }
  }).then(() => {
    if (articleSaved === false) {
      article.save(err => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log('article saved');
          res.send('Article Saved');
        }
      });
    } else {
      console.log('article exists');
      res.send('Article Exists');
    }
  });

  
  
});

// Get Saved Articles Route
router.get('/saved', (req, res) => {
  const query = {userId: req.session.passport.user};
  Article.find(query, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.send(articles);
    }
  });
});

// Delete Route
router.delete('/:id', (req, res) => {
  const query = {_id: req.params.id};
  Article.findById(req.params.id, (err, article) => {
    Article.remove(query, err => {
      if (err) {
        console.log(err);
      } else {
        res.send('Success');
      }
    });
  });
});

module.exports = router;