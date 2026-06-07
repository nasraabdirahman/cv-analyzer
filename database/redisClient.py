import redis

def db_connection():
    #connect to the db thats already running on redis
    r = redis.Redis(host="localhost", port=6379, decode_responses=True)