from database.redisClient import db

r = db.db_connection()

class Company_account:
    #create an account used for authorisation for creating jobs
    def creating_account(self, firstName, lastname, companyName, email, username, password):
        account_id = r.incr("next_account_id")
        r.hset (f"account:{account_id}", mapping={
            'firstName': firstName,
            'lastname': lastname,
            'companyName': companyName,
            'email': email,
            'username': username,
            'password': password,
        })
        return account_id

    @staticmethod
    def get_account(account_id):
      return r.hgetall(f"account:{account_id}")