from database.redisClient import db

r = db.db_connection()

class LoginMethods :
  def find_user(self, username):
    for key in r.scan_iter("account:*"):
      user = r.hgetall(key)
      if user["username"] == username:
        return user
    return None

  def check_password(self, user, password):
    if user["password"] == password:
      return "Successful login"
    return "Incorrect Password"

  def check_login(self, username, password):
    user = self.find_user(username)

    if user is None :
      return "No user found"

    return self.check_password(user, password)