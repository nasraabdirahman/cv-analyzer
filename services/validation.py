import re

class Validation:
	@staticmethod
	def validate_application(request):
		errors = []
		firstName = request.form.get("firstName", "").strip()
		lastname = request.form.get("lastname", "").strip()
		phonenumber = request.form.get("phonenumber", "").strip()
		Validation.emptyCheck("firstName", firstName, errors)
		Validation.emptyCheck("lastname", lastname, errors)
		Validation.emailCheck(request, errors)

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
		password = request.form.get("password", "").strip()
		passwordRepeat = request.form.get("passwordR", "").strip()
		Validation.emptyCheck("firstName", firstName, errors)
		Validation.emptyCheck("lastname", lastname, errors)
		errors.extend(Validation.validate_login(request))
		Validation.emailCheck(request, errors)

		if password != passwordRepeat :
			errors.append("passwords do not match")

		return errors

	@staticmethod
	def validate_login(request):
		errors = []
		username = request.form.get("username", "").strip()
		password = request.form.get("password", "").strip()
		Validation.emptyCheck("username", username, errors)
		Validation.emptyCheck("password", password, errors)
		return errors

	@staticmethod
	def emptyCheck(field_name, data, errors):
		if not data:
			errors.append(f"{field_name} is a required field")

	@staticmethod
	def emailCheck(request, errors):
		email = request.form.get("email", "").strip()
		pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}"
		if not (re.match(pattern, email)) :
				errors.append("email is a required field")