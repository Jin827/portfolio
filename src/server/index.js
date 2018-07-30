
require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

const myApi = require('./api.js');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/vendors', express.static(`${process.cwd()}/vendors`));
// app.use('/resources', express.static(path.join(__dirname, '../', 'client/resources')));
// app.use(express.static(`${process.cwd()}/static`));
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));

app.post('/api/contact', (req, res) => {
	return myApi.sendEmail(req.body)
		.then(() => {
			myApi.replyEmail(req.body);
			res.send('Email Sent Successfully!');
		})
		.catch(err => { console.log(err); });
});

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') !== 'production') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: {}
		});
	});
}

// if (process.env.NODE_ENV === "production") {
// 	app.use((req, res, next) => {
// 		if (!/https/.test(req.protocol)) {
// 			// request was via https, so do no special handling
// 			next();
// 		} else {
// 			// request was via http, so redirect to https
// 			res.redirect('https://' + req.headers.host + req.url);
// 		}
// 	});
// }

app.listen(port, () => {
	console.log(`Server is up on port ${port}!`);
});
console.log(`NODE_ENV : ${process.env.NODE_ENV} mode`);


