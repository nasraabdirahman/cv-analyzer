from database.redisClient import db
from datetime import datetime

r = db()

#returning TTL in seconds
def dateToSeconds(endDate):
    #creates a date object
    end = datetime.strptime(endDate, "%Y-%m-%d")
    #converting the date to seconds
    seconds = int((end - datetime.now()).total_seconds())
    return seconds