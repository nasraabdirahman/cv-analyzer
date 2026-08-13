from database.redisClient import db

r = db.db_connection()

class Company_account:
	def creating_company(self, companyName):
		id = r.incr("next_company_id")
		r.hset (f"company:{id}", mapping={
			'companyName': companyName,
		})
		return id

  #create an account used for authorisation for creating jobs
	def creating_account(self, firstName, lastname, companyName, email, username, password):
		account_id = r.incr("next_account_id")
		r.hset (f"company:{id}, account:{account_id}", mapping={
				'firstName': firstName,
				'lastname': lastname,
				'email': email,
				'username': username,
				'password': password,
		})
		return account_id

	
	@staticmethod
	def get_account(account_id):
		return r.hgetall(f"company:*, account:{account_id}")