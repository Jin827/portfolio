require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const port = process.env.PORT || 9900;
const myApi = require('./api.js');

const corsOptions = {
	origin: 'https://jin827.github.io',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const SUPPORTED_LANGUAGES = {
	en: 1,
	ko: 1
};

app.get('/', (req, res, next) => {
	req._lang = req.query.lang || req.cookies.lang;
	if (SUPPORTED_LANGUAGES[req._lang]) {
		// Set the language in the cookie for user accessing via heroku
		res.cookie('lang', req._lang);
	} else {
		req._lang = 'en';
	}

	if (req.query.lang) {
		return res.redirect('/');
	}

	next();
});

if (app.get('env') === 'production') {
	app.get('/', (req, res) => {
		res.redirect(`https://jin827.github.io/${req._lang}/`);
	});
	app.get('/en', (req, res) => {
		res.redirect('https://jin827.github.io/en/');
	});
	app.get('/ko', (req, res) => {
		res.redirect('https://jin827.github.io/ko/');
	});
} else {
	app.use('/vendors', express.static(`${process.cwd()}/vendors`));
	app.use('/resources', express.static(path.join(__dirname, '../', 'client/resources')));
	app.use(express.static(`${process.cwd()}/static`));

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, `/views/${req._lang}/index.html`));
	});
	app.get('/ko', function (req, res) {
		res.sendFile(path.join(__dirname, '/views/ko/index.html'));
	});
	app.get('/en', function (req, res) {
		res.sendFile(path.join(__dirname, '/views/en/index.html'));
	});
	app.get('/index.html', function (req, res) {
		res.sendFile(path.join(__dirname, '/views/index.html'));
	});
}

app.post('/api/contact', (req, res) => {
	return myApi.sendEmail(req.body)
		.then(() => myApi.replyEmail(req.body))
		.then(() => res.status(201).send('success'))
		.catch(err => {
			console.error(err);
			res.status(400).json(err);
		});
});

// error handlers
// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
	new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
	// production error handler
	// no stacktraces leaked to user
	app.use((err, req, res, next) => {
		console.error(err);
		res.status(err.status || 500);
		res.json({
			message: 'An error has occured',
			error: {}
		});
		next();
	});
} else {
	app.use((err, req, res, next) => {
		console.error(err);
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
		next();
	});
}

app.listen(port, () => {
	console.log(`Server is up on port ${port}!`);
});
console.log(`NODE_ENV : ${process.env.NODE_ENV} mode`);
