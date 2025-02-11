import React, { useRef } from "react";
import styles from "../Auth.module.css";
import callIcon from "../../../mock_data/images/callVector.png";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useSendCodeToPhone } from "../../../context/user/auth-handler";
import { authStyles } from "../muiStyles";

function Phone() {
  const inputRef = useRef();

  const sendPhoneCode = useSendCodeToPhone();

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
      <Box sx={authStyles.centerComponents}>
        <img alt="Call Icon" src={callIcon} className={styles.callIcon} />

        <Typography variant="h4" fontWeight="700">
          How can we reach you?
        </Typography>

        <Typography variant="body1">
          <Box component="span" color="#7141FA">
            Enter your phone number
          </Box>{" "}
          below to stay updated about your order!
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: "600px",
            flexDirection: "column",
            alignItems: "start",
            margin: "10px 0",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "500",
              fontSize: "small",
              padding: "5px 0",
            }}
          >
            Phone
          </Typography>
          <input
            pattern="[0-9]"
            ref={inputRef}
            onChange={phoneFormat}
            className={styles.inputPhone}
            type="text"
            placeholder="(xxx) xxx-xxxx"
            maxLength="10"
          ></input>
        </Box>

        <Link
          className={styles.buttonLink}
          to={{ pathname: "/auth/phone/otpcode" }}
        >
          <Button
            variant="contained"
            disableRipple
            sx={authStyles.authButton}
            onClick={() => {
              sendPhoneCode("+1" + inputRef.current.value);
            }}
            id="phone-sign-in-button"
          >
            Confirm
          </Button>
        </Link>

        <Link className={styles.buttonLink} to={{ pathname: "/auth/email" }}>
          <Typography
            variant="body1"
            fontWeight="700"
            color="#7141FA"
            borderBottom="2px solid #7141FA"
            display="inline-block"
          >
            Lost access to your phone?
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}

export default Phone;
