import "./Form.css";

import {
  getPasswordStrength,
} from "../../utils/validation";

function PasswordField({
  value,
  onChange,
  error,
}) {

  const strength =
    getPasswordStrength(value);

  return (

    <div className="form-group">

      <label>
        Password
        <span className="required">
          *
        </span>
      </label>

      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder="Enter password"
        className={
          error
            ? "input error"
            : value && !error
            ? "input success"
            : "input"
        }
      />

      <div className="strength-container">

        <div
          className={`strength-bar ${strength}`}
        >
        </div>

        <p className="strength-text">
          Password Strength:
          {" "}
          {strength}
        </p>

      </div>

      <ul className="requirements">

        <li>
          Minimum 6 characters
        </li>

        <li>
          One uppercase letter
        </li>

        <li>
          One number
        </li>

      </ul>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

    </div>
  );
}

export default PasswordField;