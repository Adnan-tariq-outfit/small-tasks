"use client";

import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// -------------------------
// Yup Validation Schema
// -------------------------
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be positive")
    .integer("Age must be integer")
    .required("Age is required"),
  dob: yup.date().typeError("Invalid date").required("Date of birth required"),
  gender: yup.string().required("Gender is required"),
  role: yup.string().required("Role is required"),
  acceptTerms: yup.boolean().oneOf([true], "You must accept terms"),
  profileImage: yup
    .mixed()
    .test(
      "required",
      "Profile image is required",
      (value) => value && value.length > 0
    ),
  gallery: yup
    .mixed()
    .test(
      "required",
      "Upload at least one image",
      (value) => value && value.length > 0
    ),
  address: yup.object({
    street: yup.string().required("Street required"),
    city: yup.string().required("City required"),
  }),
  hobbies: yup
    .array()
    .of(yup.string().required("Hobby cannot be empty"))
    .min(1, "At least one hobby"),
});

// -------------------------
// Form Component
// -------------------------
export default function FullForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      dob: "",
      gender: "",
      role: "",
      acceptTerms: false,
      profileImage: null,
      gallery: null,
      address: { street: "", city: "" },
      hobbies: [""],
    },
    mode: "onBlur", // real-time validation on blur
  });

  // watch password for dynamic confirm validation
  const password = watch("password");

  // watch role for conditional field example
  const role = watch("role");

  // Field Array (Hobbies)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hobbies",
  });

  const onSubmit = (data: any) => {
    console.log("FORM DATA IN SUBMIT 👉", {
      ...data,
      profileImage: data.profileImage?.[0],
      gallery: data.gallery ? Array.from(data.gallery) : [],
    });
    const formData = new FormData();

    // Primitive fields
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("age", data.age.toString());
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("role", data.role);
    formData.append("acceptTerms", data.acceptTerms ? "true" : "false");

    // Single file
    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }

    // Multiple files (Gallery)
    if (data.gallery && data.gallery.length > 0) {
      Array.from(data.gallery).forEach((file: File, index: number) => {
        formData.append(`gallery[${index}]`, file);
      });
    }

    // Nested object: Address
    formData.append("address[street]", data.address.street);
    formData.append("address[city]", data.address.city);

    // Array: Hobbies
    data.hobbies.forEach((hobby: string, index: number) => {
      formData.append(`hobbies[${index}]`, hobby);
    });
    console.log("FORM DATA 👉", formData);
    fetch("https://your-backend-api.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resData) => console.log("Response from backend:", resData))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={3}>
        Complete RHF + MUI + Yup Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* Email */}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        {/* Age */}
        <TextField
          label="Age"
          type="number"
          fullWidth
          margin="normal"
          {...register("age", { valueAsNumber: true })}
          error={!!errors.age}
          helperText={errors.age?.message}
        />

        {/* Date of Birth */}
        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register("dob")}
          error={!!errors.dob}
          helperText={errors.dob?.message}
        />

        {/* Gender (Radio) */}
        <Typography mt={2}>Gender</Typography>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          )}
        />
        {errors.gender && (
          <Typography color="error" variant="caption">
            {errors.gender.message}
          </Typography>
        )}

        {/* Role (Select) */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select {...field} fullWidth displayEmpty sx={{ mt: 2 }}>
              <MenuItem value="">
                <em>Select Role</em>
              </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          )}
        />
        {errors.role && (
          <Typography color="error" variant="caption">
            {errors.role.message}
          </Typography>
        )}

        {/* Conditional field example */}
        {role === "admin" && (
          <TextField
            label="Admin Code"
            fullWidth
            margin="normal"
            {...register("adminCode")}
          />
        )}

        {/* Accept Terms (Checkbox) */}
        <FormControlLabel
          control={<Checkbox {...register("acceptTerms")} />}
          label="Accept Terms & Conditions"
        />
        {errors.acceptTerms && (
          <Typography color="error" variant="caption">
            {errors.acceptTerms.message}
          </Typography>
        )}

        {/* Profile Image (Single File) */}
        <Typography mt={2}>Profile Image</Typography>
        <input type="file" accept="image/*" {...register("profileImage")} />
        {errors.profileImage && (
          <Typography color="error" variant="caption">
            {errors.profileImage.message}
          </Typography>
        )}

        {/* Gallery Images (Multiple Files) */}
        <Typography mt={2}>Gallery Images</Typography>
        <input type="file" accept="image/*" multiple {...register("gallery")} />
        {errors.gallery && (
          <Typography color="error" variant="caption">
            {errors.gallery.message}
          </Typography>
        )}

        {/* Address Object */}
        <Typography mt={2}>Address</Typography>
        <TextField
          label="Street"
          fullWidth
          margin="normal"
          {...register("address.street")}
          error={!!errors.address?.street}
          helperText={errors.address?.street?.message}
        />
        <TextField
          label="City"
          fullWidth
          margin="normal"
          {...register("address.city")}
          error={!!errors.address?.city}
          helperText={errors.address?.city?.message}
        />

        {/* Hobbies Array */}
        <Typography mt={2}>Hobbies</Typography>
        {fields.map((item, index) => (
          <Box key={item.id} display="flex" alignItems="center" mb={1}>
            <TextField
              fullWidth
              placeholder="Hobby"
              {...register(`hobbies.${index}` as const)}
              error={!!errors.hobbies?.[index]}
              helperText={errors.hobbies?.[index]?.message}
            />
            <IconButton onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button variant="outlined" onClick={() => append("")} sx={{ mb: 2 }}>
          Add Hobby
        </Button>

        {/* Submit */}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
