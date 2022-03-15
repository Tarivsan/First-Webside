const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
// importowanie modelu quiz

/* GET quiz page. */
router.get('/', (req, res) => {
  const show = !req.session.vote;
  Quiz.find({}, (err, data) => {
    let sum = 0;
    // liczenie glosów oddanych
    data.forEach((item) => {
      sum += item.vote;
    });
// renderowanie info na stronie
    res.render('quiz', { title: 'Quiz', data, show, sum });
  });
});

// metoda post do przechwytywania wyboru

router.post('/', (req, res) => {
  // jesli bedzie oddany vote czyli vote bedzie 1 to pokaze wyniki jak nie bedzie ta wartosc istaniala to nie pokaze
// nasze dane quiz to nasz button ustawiony w quiz.pug
  const id = req.body.quiz;

  Quiz.findOne({ _id: id }, (err, data) => {
    data.vote = data.vote + 1;
    // zwiekszam liczbe ile osob na co glosowaly 
    data.save((err) => {
      req.session.vote = 1;
      res.redirect('/quiz');
      // ma sie wykonac dopiero gdy bedzie save

    });
  });
});

module.exports = router;
