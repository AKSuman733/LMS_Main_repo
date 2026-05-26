import "./Form.css";

import SubmitLoading
from "./SubmitLoading";

function SubmitButton({
  loading,
  text,
  onClick,
}) {

  return (

    <button
      className="submit-btn"
      disabled={loading}
      onClick={onClick}
    >

      {loading ? (
        <>

          <SubmitLoading />

          Loading...

        </>
      ) : (
        text
      )}

    </button>
  );
}

export default SubmitButton;