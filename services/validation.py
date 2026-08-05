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
				errors.append("First name is a required field")
		
		if not lastname:
				errors.append("Lastname is a required field")

		pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}"
		if not (re.match(pattern, email)) :
				errors.append("Email is a required field")

		if not (phonenumber.isdigit() and len(phonenumber) >= 8 ) :
				errors.append("Phonenumber is a required field")

		cv = request.files.get("cv")
		if cv is None :
				errors.append("CV is a required field")
		
		coverLetter = request.files.get("coverLetter")
		if coverLetter is None :
				errors.append("Cover letter is a required field")

		return errors 

	@staticmethod
	def validate_signup(request):
		errors = []
		firstName = request.form.get("firstName", "").strip()
		lastname = request.form.get("lastname", "").strip()
		companyName = request.form.get("companyName", "").strip()
		email = request.form.get("email", "").strip()
		password = request.form.get("password", "").strip()
		passwordRepeat = request.form.get("passwordR", "").strip()

		if not firstName:
			errors.append("First name is a required field")
				
		if not lastname:
			errors.append("Lastname is a required field")

		if not companyName:
					errors.append("Company is a required field")

		pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}"
		if not (re.match(pattern, email)) :
			errors.append("Email is a required field")

		errors.extend(Validation.validate_login(request))

		if password != passwordRepeat :
			errors.append("passwords do not match")

		return errors

	@staticmethod
	def validate_login(request):
		errors = []
		username = request.form.get("username", "").strip()
		password = request.form.get("password", "").strip()

		if not username:
			errors.append("Username is a required field")
		
		if not password:
			errors.append("Password is a required field")

		return errors