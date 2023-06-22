
const db = require('../services/database.js');

exports.register = (name, email,password) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO newsusers(name, email,password) VALUES (?, ?, ?)';
        db.config.query(sql, [name, email, password], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM newsusers";
        db.config.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getUser = user_id => new Promise((resolve, reject) => {
    const sql = "SELECT * FROM newsusers WHERE id = ?";
    db.config.query(sql, [user_id], function (err, user, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(user[0]);
        }
    })
});

exports.createComment = (userId, comment, articleId) => {
    return new Promise((resolve, reject) => {
        if (!comment) {
            reject(new Error('Comment is required')); // Reject if 'post' value is empty or null
        } else {
            const sql = 'INSERT INTO comments (userId, comment, articleId) VALUES (?, ?, ?)';
            db.config.query(sql, [userId, comment, articleId], (err, result) => {
                if (err) {
                    const errorMessage = 'Error creating comment: ' + err.message;
                    reject(new Error(errorMessage));
                } else {
                    resolve(result);
                }
            });
        }
    });
};

exports.getComments = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM comments';
        db.config.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


exports.getCommentsForArticle = (articleId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM comments WHERE articleId = ?';
        db.config.query(sql, [articleId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
