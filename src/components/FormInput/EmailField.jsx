import "./Form.css";

import {
  FaCheckCircle,
} from "react-icons/fa";

function EmailField({
  value,
  onChange,
  error,
  isValid,
}) {

  return (

    <div className="form-group">

      <label>
        Email
        <span className="required">
          *
        </span>
      </label>

      <div className="input-wrapper">

        <input
          type="email"
          value={value}
          onChange={onChange}
          placeholder="Enter your email"
          className={
            error
              ? "input error"
              : isValid
              ? "input success"
              : "input"
          }
        />

        {isValid && (

          <FaCheckCircle
            className="success-icon"
          />

        )}

      </div>

      {error && (

        <p className="error-text">
          {error}
        </p>

      )}

    </div>
  );
}

export default EmailField;