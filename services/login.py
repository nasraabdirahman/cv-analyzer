from database.redisClient import db

r = db.db_connection()

class LoginMethods : 
  def check_login_company(self, username, password): #exceptions
    for key in r.scan_iter(f"account:*"):
      user = r.hgetall(key)
      if user["username"] == username:
        if user["password"] == password:
          return "Successful login"
        return "Incorrect Password"
      return "no user found"

  def check_login_application(self, username, password): #exceptions
      for key in r.scan_iter(f"application:*"):
        user = r.hgetall(key)
        if user["username"] == username:
          if user["password"] == password:
            return "Successful login"
          return "Incorrect Password"
        return "no user found"