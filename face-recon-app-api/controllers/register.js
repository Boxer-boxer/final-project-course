const handleRegister = (req, res, db, bcrypt) => {
	const {email, name, password} = req.body;
	
	if( !email || !name || !password ) {
 		return res.status(400).json('Incorrect form subsmission')
	}

	const hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginemail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginemail[0],
				name: name,
				joined: new Date(),
			})
			.catch(err => res.status(400).json('Unable to join, E-mail already taken'))
			.then(user => {
			res.json(user[0])
		})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
}

module.exports = {
	handleRegister: handleRegister
};