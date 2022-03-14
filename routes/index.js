const express = require('express');
const router = express.Router();
const login = 'admin';
const password = '12345';

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Logging' });
});

router.post('/login', (req, res) => {
  const body = req.body;
  if(body.login === login && body.password === password) {
    req.session.admin = 1;
    
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});
// akcja logowania prowadzi do przekierowania w odpowiedzi na req dajemy res i wskazujemy gdzie ma dojsc do przekierowania wpisywane haslo i login znajduja sie w body

module.exports = router;
