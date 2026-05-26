import "./User.css";

import {
  colors,
  spacing,
  shadows
} from "../../styles/designtokens";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import EmailField from "../../components/FormInput/EmailField";
import PasswordField from "../../components/FormInput/PasswordField";
import SubmitButton from "../../components/FormInput/SubmitButton";

import {
  validateEmail,
  validatePassword,
} from "../../utils/validation";

function Admin() {

  const navigate = useNavigate();

  // STATES
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [emailError, setEmailError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // EMAIL VALIDATION
  const handleEmailChange = (e) => {

    const value = e.target.value;

    setEmail(value);

    setEmailError(
      validateEmail(value)
    );

  };

  // PASSWORD VALIDATION
  const handlePasswordChange = (e) => {

    const value = e.target.value;

    setPassword(value);

    setPasswordError(
      validatePassword(value)
    );

  };

  // LOGIN FUNCTION
  const handleLogin = () => {

    // EMPTY FIELD CHECK
    if (
      !email ||
      !password
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;

    }

    // VALIDATION CHECK
    if (
      emailError ||
      passwordError
    ) {

      toast.error(
        "Please fix form errors"
      );

      return;

    }

    // START LOADING
    setLoading(true);

    // ADMIN CREDENTIALS
    const adminEmail =
      "admin@gmail.com";

    const adminPassword =
      "A12345";

    // FAKE API CALL
    setTimeout(() => {

      setLoading(false);

      if (
        email === adminEmail &&
        password === adminPassword
      ) {

        toast.success(
          "Admin Login Successful"
        );

        navigate("/adashboard");

      } else {

        toast.error(
          "Invalid Email or Password"
        );

      }

    }, 2000);

  };

  return (

    <div
      className="main"
      style={{
        paddingLeft: 100,
      }}
    >

      <div
        className="container1"
        style={{
          backgroundColor:
            colors.gray400,

          boxShadow:
            shadows.md,

          padding:
            spacing.sm,

          borderRadius: 20,

          paddingTop: 250,
        }}
      >

        <h2>
          Admin Login Page
        </h2>

        <h5>
          Sign in with Google
        </h5>

        <button
          className="google"
          style={{
            backgroundColor:
              colors.white,
          }}
        >
          Continue with Google
        </button>

        <nav>OR</nav>

        <div
          className="sample"
          style={{
            backgroundColor:
              colors.gray400,

            paddingTop: 10,
            paddingLeft: 50,
            paddingBottom: 30,
          }}
        >

          Sample Email to be used:

          <br />

          Email: admin@gmail.com

          <br />

          Password: A12345

        </div>

        <EmailField
          value={email}
          onChange={
            handleEmailChange
          }
          error={emailError}
          isValid={
            email &&
            !emailError
          }
        />

        <PasswordField
          value={password}
          onChange={
            handlePasswordChange
          }
          error={passwordError}
        />

        <SubmitButton
          loading={loading}
          text="Login"
          onClick={handleLogin}
        />

      </div>

    </div>
  );
}

export default Admin;