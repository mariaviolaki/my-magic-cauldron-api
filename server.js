const express = require('express');
const bodyParser = require('body-parser');
const knex = require ('knex');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const signup = require('./controllers/signup');
const login = require('./controllers/login');
const newname = require('./controllers/newname');
const newusername = require('./controllers/newusername');
const newemail = require('./controllers/newemail');
const deactivate = require('./controllers/deactivate');
const game = require('./controllers/game');

/*******************************************/

// Connect database to server
const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

/*******************************************/


app.get('/', (req, res) => {
	res.json('GET response working!');
});

app.post('/signup', (req, res) => {
	signup.handleSignUp(req, res, db, bcrypt);
});

app.post('/login', (req, res) => {
	login.handleLogIn(req, res, db, bcrypt);
});

app.put('/newname', (req, res) => {
	newname.handleNewName(req, res, db);
});

app.put('/newusername', (req, res) => {
	newusername.handleNewUsername(req, res, db);
});

app.put('/newemail', (req, res) => {
	newemail.handleNewEmail(req, res, db);
});

app.delete('/deactivate', (req, res) => {
	deactivate.handleDeactivate(req, res, db);
});

app.put('/game', (req, res) => {
	game.handleGame(req, res, db);
});


/*******************************************/


app.listen(process.env.PORT || 3002, () => {
	console.log(`App is running on port ${process.env.PORT}`);
});