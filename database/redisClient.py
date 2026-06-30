import redis

class db:
    def db_connection():
        #connect to the db thats already running on redis
        return redis.Redis(host="localhost", port=6379, decode_responses=True)