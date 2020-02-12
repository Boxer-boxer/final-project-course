const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});
 

const app = express();
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is Running on ${PORT}`)	
	})


app.get('/', (req, res) => {
	res.send('its working!')
	/*res.send(database.users)*/
})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)} )


app.post('/signin', (req, res) => {
	const {email, password} = req.body;

	if( !email || !password ) {
 		return res.status(400).json('Incorrect form subsmission')
	}


	db.select('email', 'hash').from('login')
		.where( 'email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid) {
				return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('Something went horribly wrong'))
			} else {
				res.status(400).json('Wrong Credentials, try again!')
			}
		})
		.catch(err => res.status(400).json('Wrong Credentials'))

})


app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;

	db.select('*').from('users')
		.where({id: id})
		.then(user => {
			if(user.length) {
				res.json(user[0])
			} else {
				res.status(400).json('User was not found')		
			}
		})
		.catch(err => res.status(400).json('An Error has occured, Im sorry Im trying my best')) 


})

app.put('/image', (req, res) =>{
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0])
		})
		.catch(err => res.status(400).json('Unable to get count. Im Sorry'))

})


/*	let found = false;
	database.users.forEach( user => {
		if(user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries)
		}
	})
	if (!found) {
		res.status(404).json('user not found, try again.')
	}*/

// Planning the API ...
// Have an idea of the design
/*

/ --> root
/Signin  --> POST {user info} = success/fail
/register --> POST {add user info} = return created user
/profile/:userId --> GET {user info} = return user
/image --> PUT  = user/count? This one is kinda confusing me.

*/