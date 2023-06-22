var express = require('express');
var router = express.Router();
const { fetchNewsArticles } = require('../controllers/newsController');

const userController = require('../controllers/userController');
const authenticationService = require('../services/authentication');
const { authenticateJWT } = require('../services/authentication');
const userModel = require('../models/userModel');
const newsController = require('../controllers/newsController')

/* GET home page. */
router.route('/login')
    .get((req, res, next) => {
        res.render('login');
    })
    .post((req, res, next) => {
        userModel.getAllUsers()
            .then((users) => {
                authenticationService.authenticateUser(req, users, res)
            })
            .catch((err) => {
                res.sendStatus(500)
            })
    });

router.post('/addComment',authenticateJWT, userController.createComment)
router.get('/comments',authenticateJWT, userController.getComments)


router.route('/')
    .get( async (req, res, next) => {
        const articles = await fetchNewsArticles();
        res.render('index', { articles });
    })

router.route('/article')
    .get(authenticateJWT, async (req, res, next) => {
        try {
            const articles = await fetchNewsArticles(); // Fetch data from the API
            res.render('article', { articles }); // Pass the fetched data to the article view
        } catch (error) {
            // Handle any errors that occur during API fetch
            console.error(error);
            res.sendStatus(500);
        }
    });

router.route('/article/:id')
    .get(authenticateJWT, async (req, res, next) => {
        try {
            const articles = await fetchNewsArticles(); // Fetch data from the API
            res.render('article', { articles:articles[req.params.id] }); // Pass the fetched data to the article view
        } catch (error) {
            // Handle any errors that occur during API fetch
            console.error(error);
            res.sendStatus(500);
        }
    });

router.get('/logout', (req, res) => {
    res.cookie('accessToken', '', {maxAge: 0});
    res.redirect('/');
})

router.get('/user/:id', authenticateJWT, userController.getUser);

router.post('/register', userController.register);

router.get('/news', async (req, res) => {
    const articles = await fetchNewsArticles();
    res.render('news', { articles }); // Assuming you're using a template engine like EJS
});

router.route('/aboutus')
    .get( async (req, res, next) => {
        res.render('aboutus',);
    })


module.exports = router;