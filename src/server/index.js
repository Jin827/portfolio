
require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8080;

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

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, POST, DELETE');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

// app.use('/vendors', express.static(`${process.cwd()}/vendors`));
// app.use('/resources', express.static(path.join(__dirname, '../', 'client/resources')));
// app.use(express.static(`${process.cwd()}/static`));
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));
app.get('/', (req, res) => {
	res.redirect('https://jin827.github.io');
});

app.post('/api/contact', (req, res) => {
	return myApi.sendEmail(req.body)
		.then(() => {
			myApi.replyEmail(req.body).then(() => {
				res.send('Email Sent Successfully!');
			});
		})
		.catch(err => {
			res.status(500).send('Email not sent!');
			console.log(err);
		});
});

// error handlers
// catch 404 and forward to error handler
app.use(function (next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') !== 'production') {
	app.use(function (err, res) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, res) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: {}
		});
	});
}

app.listen(port, () => {
	console.log(`Server is up on port ${port}!`);
});
console.log(`NODE_ENV : ${process.env.NODE_ENV} mode`);

