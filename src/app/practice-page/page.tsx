"use client";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

const Page = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  console.log(inputRefs);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    setError("");
    setSuccess("");

    // Move to next input if value is entered
    if (e.target.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (otp.join("") === "123456") {
      setSuccess(true);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };
  const handleReset = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess("");
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "500px",
          p: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <LockOutlineIcon sx={{ fontSize: 32 }} />
        </Box>
        <Typography variant="h5" fontWeight={600}>
          Verify Your Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We have sent a 6-digit code to your email/phone
        </Typography>
        {success && <Alert severity="success">Verfication Successfull.</Alert>}
        {error && <Alert severity="error">OTP Invalid</Alert>}

        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          {otp.map((val: string, index: number) => (
            <TextField
              inputProps={{ maxLength: 1 }}
              onChange={(e) => handleChange(index, e)}
              value={val}
              inputRef={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[index] && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
              key={index}
              sx={{
                width: 50,

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: 2,
                    borderColor: "text.secondary",
                  },
                  "& input": { height: 30, fontSize: 30, textAlign: "center" },

                  // 🔵 Hover
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },

                  // 🔴 Focused
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main",
                  },

                  // 🟢 Clicked (active) — same as focused visually
                  "&.Mui-focused": {
                    borderColor: "red",
                  },
                },
              }}
            />
          ))}
        </Box>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={otp.some((b) => !b) || loading || success}
          size="large"
          sx={{ width: "100%", mt: 3 }}
        >
          {loading ? <CircularProgress size={"30px"} /> : "verify otp"}
        </Button>
        <Box marginTop={2} onClick={handleReset}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Didn&apos;t receive the code?{" "}
            <Link
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              Resend OTP
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Page;
