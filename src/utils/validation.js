const validator = require("validator");

const validateSignup = (req) => {
  const { password, email, lastName, firstName } = req?.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  }

  if (firstName.length > 15) {
    throw new Error("First name cannot exceed 15 characters");
  }

  if (lastName.length > 15) {
    throw new Error("Last name cannot exceed 15 characters");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password is not strong enough. It must contain at least 8 characters, including one uppercase letter, one number, and one symbol."
    );
  }
};

module.exports = { validateSignup };
