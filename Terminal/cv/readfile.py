def cv_file(): 

    cv_file_path = input("Give file path: ")
    #file_name1 = "C:/Users/nasra/Documents/cv-analyzer/cv/cv.txt"
    try:
        #returns file object
        with open(cv_file_path, "r") as file:
            content = file.read()
            return content
    except FileNotFoundError:
        print("File not found")
    except PermissionError:
        print("You do not have permission to read that file")

def job_des_file():
    job_des_file_path = input("Give file path for the job description")
    #file_name = "C:/Users/nasra/Documents/cv-analyzer/cv/job.txt"
    try:
        #returns file object
        with open(job_des_file_path, "r") as file:
            content = file.read()
            return content
    except FileNotFoundError:
        print("File not found")
    except PermissionError:
        print("You do not have permission to read that file")