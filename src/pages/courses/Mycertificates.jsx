import templateImg from "../../assets/template.png";

import {
  colors,
  spacing,
  typography
} from "../../styles/designtokens";

function Mycertificates() {

  return (

      <div
        className="cert-page"
        style={{
          backgroundColor: colors.gray200,
          minHeight: "100vh",
          padding: spacing.lg,
        }}
      >

        <h1
          style={{
            color: colors.primary,
            marginBottom: spacing.lg,
            paddingLeft:400,
          }}
        >
          My Certificates
        </h1>

        <div
          className="cert-card"
          style={{
            backgroundColor:colors.gray200,
            padding: spacing.md,
            borderRadius: "10px",
            width: "fit-content",
          }}
        >

          <img
            src={templateImg}
            alt="Certificate"
            style={{
              width:"400px",
              borderRadius: "10px",
              paddingLeft:300,
            }}
          />

          <p
            style={{
              marginTop: spacing.sm,
              color: colors.black,
              textAlign: "center",
            }}
          >
            Sample Certificate
          </p>

        </div>

      </div>


  );
}

export default Mycertificates;