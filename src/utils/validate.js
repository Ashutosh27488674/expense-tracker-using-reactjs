/*eslint-disable*/

export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const signUpValidation = (formfields) => {
  let nameError = "";
  let emailError = "";
  let passwordError = "";
  let confirmPasswordError = "";
  let isInvalid = false;

  const { name, email, password, confirmPassword } = formfields;

  if (name.trim().length === 0 || name.length < 3) {
    nameError = "Name can not be empty or less than 3 characters.";
  }

  if (!email || !emailRegex.test(email)) {
    emailError = "Please enter a valid email";
  }

  if (password.trim().length === 0 || password.length < 6) {
    passwordError = "Password must contain atleast 6 characters.";
  }

  if (confirmPassword.trim().length === 0 || confirmPassword.length < 6) {
    confirmPasswordError = "Password must contain atleast 8 characters.";
  }

  if (password !== confirmPassword) {
    passwordError = "Passwords do not match.";
    confirmPasswordError = "Passwords do not match.";
  }

  if (nameError || emailError || passwordError || confirmPasswordError) {
    isInvalid = true;
  }

  return {
    isInvalid,
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
  };
};

export const signInValidation = (formfields) => {
  let emailError = "";
  let passwordError = "";
  let isInvalid = false;
  const { email, password } = formfields;
  if (!email || !emailRegex.test(email)) {
    emailError = "Please enter a valid email";
  }

  if (password.trim().length === 0 || password.length < 6) {
    passwordError = "Password must contain atleast 6 characters.";
  }

  if (emailError || passwordError) {
    isInvalid = true;
  }

  return {
    isInvalid,
    emailError,
    passwordError,
  };
};