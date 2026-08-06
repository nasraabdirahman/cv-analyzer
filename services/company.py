from database.redisClient import db

r = db.db_connection()

class Company_schema:
    #create a database for companies
	@staticmethod
	def companyDB(companyName, accountId):
		key = f"company:{accountId}"
		r.hset (key, mapping={
			'companyName': companyName,
			'account_id': accountId,
		})
		return key