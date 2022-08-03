import React, { useRef } from "react";
import styles from "../Auth.module.css";
import callIcon from "../../../mock_data/images/callVector.png";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

function Phone({ lostAccess }) {
  const inputRef = useRef();

  //Regex to format 10 given numbers to an American phone number
  const phoneFormat = () => {
    let phoneNumber = inputRef.current.value;
    inputRef.current.value = phoneNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "($1) $2-$3"
    );
  };

  return (
    <Container>
      <div className={styles.centering}>
        <img src={callIcon} className={styles.callIcon} />

        <h1>How can we reach you?</h1>

        <p>
          <span className={styles.purpleText}>Enter your phone number</span>{" "}
          below to stay updated about your order!
        </p>

        <div className={styles.inputDiv}>
          <span className={styles.inputSpan}>Phone</span>
          <input
            pattern="[0-9]"
            ref={inputRef}
            onChange={phoneFormat}
            className={styles.inputPhone}
            type="text"
            placeholder="(xxx) xxx-xxxx"
            maxLength="10"
          ></input>
        </div>

        <Link
          className={styles.buttonLink}
          to={{ pathname: "/auth/phone/otpcode" }}
        >
          <button className={styles.confirmButton}>Confirm</button>
        </Link>

        <p>
          Lost access to your phone?{" "}
          <span className={styles.purpleLink} onClick={lostAccess}>
            <Link
              className={styles.purpleLink}
              to={{ pathname: "/auth/email" }}
            >
              Click here
            </Link>
          </span>
        </p>
      </div>
    </Container>
  );
}

export default Phone;
