
const userModel = require('../models/userModel');



const bcrypt = require('bcrypt');
exports.register = (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        userModel.register(name, email, hash)
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Internal Server Error');
            });
    });
};


exports.createComment = (req, res) => {
    const { comment } = req.body;


    const userId = req.user.id;
    console.log(JSON.stringify( { comment })+'idddddd')
    userModel.createComment(userId, comment)
        .then(() => {
            res.redirect('/comments');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
};

exports.getComments = async (req, res, next) => {
    try {

        const comments = await userModel.getComments();

        res.render('article', {comments: comments});
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
};

exports.getUser = (req, res, next) => {
    // Cast to number as the id in token is a number and params are always strings
    if (parseInt(req.params.id) !== req.user.id) {
        return res.status(403).send('Unauthorized access');
    }

    userModel.getUser(parseInt(req.user.id))
        .then(console.log("users render"))

        .catch(error => {
            res.status(404)
            next(error);
        })
};