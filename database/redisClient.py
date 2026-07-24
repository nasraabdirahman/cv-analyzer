import redis

class db:
    def db_connection():
        #connect to the db thats already running on redis
        try:
            client = redis.Redis(host="localhost", port=6379, decode_responses=True) 
            client.ping()
            return client
        except redis.RedisError:
            return redis.Redis(host="redis", port=6379, decode_responses=True) 

        