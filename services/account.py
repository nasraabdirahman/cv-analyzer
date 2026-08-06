from database.redisClient import db

r = db.db_connection()

class Company_account:
    #create an account used for authorisation for creating jobs
	def creating_account(self, firstName, lastname, email, username, password):
		account_id = r.incr("next_account_id")
		r.hset (f"account:{account_id}", mapping={
			'firstName': firstName,
			'lastname': lastname,
			'email': email,
			'username': username,
			'password': password,
		})
		return account_id