import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";
import styles from "./Login.module.css";
import { signInValidation } from "../utils/validate";
const initialInputState = {
  email: "",
  password: "",
};

const initialInputErrorState = {
  emailError: "",
  passwordError: "",
};

const Login = () => {
  const [inputs, setInputs] = useState(initialInputState);
  const [inputsError, setInputsError] = useState(initialInputErrorState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signin,user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { isInvalid, ...errors } = signInValidation(inputs);
    if (isInvalid) {
      setInputsError(errors);
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signin(inputs.email, inputs.password);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("Failed to sign in.");
    }
  };

  const emailClasses = `${styles["form-control"]} ${
    inputsError.emailError ? styles["form-control-error"] : ""
  }`;
  const passwordClasses = `${styles["form-control"]} ${
    inputsError.passwordError ? styles["form-control-error"] : ""
  }`;

  if(user)
  {
    return <Navigate to="/" />
  }
  return (
    <div className={styles.container}>
      <div className={styles["form-box"]}>
        <h1 className={styles["heading"]}>Sign-In</h1>
        <form onSubmit={handleFormSubmit}>
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
          <button disabled={loading} className={styles["form-btn"]}>
            {loading ? "signing-in..." : "Sign-In"}
          </button>
          {error && <p className={styles["error"]}>{error}</p>}
        </form>
        <div className={styles["create-account-button"]}>
          <h5>New to Expense Tracker ?</h5>
          <Link to="/signup" >Create your Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
