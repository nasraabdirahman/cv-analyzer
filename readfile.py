def cv_file(): 
    file_name1 = "C:/Users/nasra/Documents/cv-analyzer/cv/cv.txt"
    try:
        #returns file object
        with open(file_name1, "r") as file:
            content = file.read()
            return content
    except FileNotFoundError:
        print("File not found")
    except PermissionError:
        print("You do not have permission to read that file")

def job_des_file():
    file_name = "C:/Users/nasra/Documents/cv-analyzer/cv/job.txt"
    try:
        #returns file object
        with open(file_name, "r") as file:
            content = file.read()
            return content
    except FileNotFoundError:
        print("File not found")
    except PermissionError:
        print("You do not have permission to read that file")