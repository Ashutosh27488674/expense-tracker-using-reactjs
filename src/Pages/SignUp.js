import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";
import { signUpValidation } from "../utils/validate";
import styles from "./Login.module.css";

const initialInputState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialInputErrorState = {
  nameError: "",
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
};

const SignUp = () => {
  const [inputs, setInputs] = useState(initialInputState);
  const [inputsError, setInputsError] = useState(initialInputErrorState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup,user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { isInvalid, ...errors } = signUpValidation(inputs);
    if (isInvalid) {
      setInputsError(errors);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signup(inputs.email, inputs.password);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("Unable to create amazon account.");
    }
  };

  const nameClasses = `${styles["form-control"]} ${
    inputsError.nameError ? styles["form-control-error"] : ""
  }`;
  const emailClasses = `${styles["form-control"]} ${
    inputsError.emailError ? styles["form-control-error"] : ""
  }`;
  const passwordClasses = `${styles["form-control"]} ${
    inputsError.passwordError ? styles["form-control-error"] : ""
  }`;
  const confirmPasswordClasses = `${styles["form-control"]} ${
    inputsError.confirmPasswordError ? styles["form-control-error"] : ""
  }`;
  if(user)
  {
    return <Navigate to="/" />
  }
  return (
    <div className={styles.container}>
      <div className={styles["form-box"]}>
        <h1 className={styles["heading"]}>Sign-Up</h1>
        <form onSubmit={handleFormSubmit}>
        <div className={nameClasses}>
            <label>Name</label>
            <input
              type="text"
              value={inputs.name}
              name="name"
              onChange={handleChange}
            />
            {inputsError.nameError && <p>{inputsError.nameError}</p>}
          </div>
          <div className={emailClasses}>
            <label>Email</label>
            <input
              type="text"
              value={inputs.email}
              name="email"
              onChange={handleChange}
            />
            {inputsError.emailError && <p>{inputsError.emailError}</p>}
          </div>
          <div className={passwordClasses}>
            <label>Password</label>
            <input
              type="password"
              value={inputs.password}
              name="password"
              onChange={handleChange}
            />
            {inputsError.passwordError && <p>{inputsError.passwordError}</p>}
          </div>
          <div className={confirmPasswordClasses}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={inputs.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
            {inputsError.confirmPasswordError && <p>{inputsError.confirmPasswordError}</p>}
          </div>
          <button disabled={loading} className={styles["form-btn"]}>
            {loading ? "signing-up..." : "Sign-Up"}
          </button>
          {error && <p className={styles["error"]}>{error}</p>}
        </form>
        <div className={styles["create-account-button"]}>
          <h5>Already have an Acoount ?</h5>
          <Link to="/login">Login into your Account</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
