export default function Validation(values) {
  let errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d).{8,}$/;

  if (values?.name) {
    if (values.name === "") {
      errors.name = "Name Should Not Empty.";
    } else if (values.name.length < 3 || values.name.length > 30) {
      errors.name = "Name Must be B/W 3-30";
    } else {
      errors.name = "";
    }
  }

  if (values.email === "") {
    errors.email = "Email Should Not Empty.";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Invalid Email!!!";
  } else {
    errors.email = "";
  }

  if (values.password === "") {
    errors.password = "Password Should Not Empty.";
  } else if (!password_pattern.test(values.password)) {
    errors.password =
      "Password must start with a capital letter, be 8+ chars, and include 3+ numbers.";
  } else {
    errors.password = "";
  }

  return errors;
}
