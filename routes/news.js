const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', (req, res) => {
  const search = req.query.search || '';
  //klikajac w szukaj dostaje wartosc o nazwie search i wlasnie to sobie pobieram

  const findNews = News
  .find({ title: new RegExp(search.trim(), 'i')})
  .sort({created: -1});
// sposob na szukanie czlonow wyrazenia przy uzyciu RegExp parametr 'i' sluzy do szukania

  findNews.exec((err, data) => {
    res.render('news', { title: 'News', data, search });
  })
});
// pobieram szablon news nastepnie w findNews przechowuje wynik news.find a nastepnie odpalam to przez exec sprawdzajac jednoczesnie bledy sort sortuje dane
//w formie obiektu sortujemy -1 od najnowszych 1 od najstarszych 0 zostawiamy domyslne
module.exports = router;
