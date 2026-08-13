from database.redisClient import db

r = db.db_connection()

class CompanyRepoService:
	def creating_company(self, name):
		id = r.incr("next_company_id")
		r.hset (f"company:{id}", mapping={
			'name': name,
		})
		return id

  #create an account used for authorisation for creating jobs
	def creating_account(self, firstName, lastname, email, username, password):
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
		key = r.scan_iter(f"company:*, account:{account_id}")
		return next(key)