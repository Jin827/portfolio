require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

const myApi = require('./api.js');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/', (req, res) => {

    return myApi.sendEmail(req.body)
        .then(myApi.replyEmail(req.body))
        .catch(err => console.log(err))
});

app.use(express.static(`${process.cwd()}/client`));

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
// if (app.get('env') !== 'production') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.status('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({
//         message: err.message,
//         error: {}
//     });
// });

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});

console.log("NODE_ENV : " + process.env.NODE_ENV + " mode");