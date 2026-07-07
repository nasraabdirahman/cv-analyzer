import re

class Validation:
    @staticmethod
    def validate_application(request):
        errors = []
        firstName = request.form.get("firstName", "").strip()
        lastname = request.form.get("lastname", "").strip()
        email = request.form.get("email", "").strip()
        phonenumber = request.form.get("phonenumber", "").strip()

        if not firstName:
            errors.append("First name is required")
        
        if not lastname:
            errors.append("Lastname is required")

        pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}"
        if not (re.match(pattern, email)) :
            errors.append("Email is required")
    
        if not (phonenumber.isdigit() and len(phonenumber) >= 8 ) :
            errors.append("Phonenumber is required")

        cv = request.files.get("cv")
        if cv is None :
            errors.append("CV is required")
        
        coverLetter = request.files.get("coverLetter")
        if coverLetter is None :
            errors.append("Cover Letter is required")

        return errors 