const express = require('express');
const { runtime } = require('pug/lib');
const News = require('../models/news');
const router = express.Router();


// na każdy adres ta metoda się odpali dzieki temu zweryfikujemy wszelkie proby wejscia do admina bedzie to chronilo sesja jesłi sie okaze ze nie jest zalogowany admin to zakladka admina kieruje na login
router.all('*', (req, res, next) => {
  if(!req.session.admin) {
    res.redirect('login');
    return
  } 
next();
});



/* GET home page. */
router.get('/', (req, res) => {

// pobieramy liste artukulow za pomoca metody find
//asynchronicznie data jest parametrem funkcji
News.find({}, (err, data) => {
  console.log(data);
  res.render('admin/index', { title: 'Admin', data });
});


//   run()
//   async function run() {
//   const newsData = new News({
//     title: 'Próbny tytuł',
//     description: 'Jest to kolejny test tworzenia bazy danych'
//   });

// await newsData.save((err) => {
//     console.log(`Nie udało się news ${err}`);
//   });
  // zapisujemy to co stowrzylismy
});

// PODSTRONA DO TWORZENIA NEWSOW
router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Dodaj nowy artykuł człowieczku', body: {}, errors: {} });


});

router.post('/news/add', (req, res) => {
  const body = req.body;
// pod parametrem body mamy dostępne dane 

  const newsData = new News(body);
  const errors = newsData.validateSync();
// walidacja bledow w przypadku gdy formularz nie zostanie wlasciwie wypelniony
  
  newsData.save((err) => {
    if(err){
      res.render('admin/news-form', { title: 'Dodaj nowy artykuł człowieczku', errors, body });
      return;
// jesli bedzie blad wowczas ponownie wczytujemy okno dodawania artykułu 
    }
    res.redirect('/admin')
//jesli dodamy prawidlowo artykul przenosi nas wowczas do admina ktory bedzie tablica wyswietlajaca nasze artykuly
  });
// zapisujemy to co stowrzylismy

});
// dodaje bledy ktore maja sie wyswietlic na stronie jesli zaistnieja


// usuwanie artykulow
// :id moge samemu wybrac co to ma byc co ma znaczyc :id
//nasze id jest w request params w przypadku bledu ma wrocic na strone admina
router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    res.redirect('/admin')
  })
  


});



module.exports = router;
