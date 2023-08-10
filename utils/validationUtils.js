function validateSignUpInput(req) {
  const { firstname, lastname, accountname, password, DOB } = req.body;
  const errors = [];

  if (!password || !DOB) {
    errors.push("All fields must be filled");
  }

  // Validate accountname without spaces
  if (accountname.includes(" ") || !accountname) {
    errors.push("account without space");
  }

  // Validate first name and last name
  // not space at start and end & no space more than one inside
  const nameRegex = /^[^\s]+(?:\s[^\s]+)*$/;
  if (!nameRegex.test(firstname) || !firstname) {
    errors.push("Invalid Name");
  }
  if (!nameRegex.test(lastname) || !lastname) {
    errors.push("Invalid Name");
  }

  const passwordValidation =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordValidation.test(password)) {
    errors.push("Password must be in a proper pattern");
  }

  if (req.body.parentConfirmation === true) {
    const { guardianEmail, guardianPhone } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!guardianPhone || !guardianEmail) {
      errors.push("Guardian fields are required");
    }

    // check email valid
    if (!emailRegex.test(guardianEmail)) {
      errors.push("Invalid Guardian credentials");
    }
  }

  return errors;
}

module.exports = {
  validateSignUpInput,
};
