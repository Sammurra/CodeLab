const express = require('express');
const app = express();
const port = 3900;

const bodyParser = require('body-parser');
const path = require('path');
const indexRouter = require('./routes/index');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});