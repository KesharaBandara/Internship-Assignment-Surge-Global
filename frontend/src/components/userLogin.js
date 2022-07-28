import { useHistory } from "react-router-dom";
import InputField from "./password";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import React, { useState } from "react";
import loginStyle from "./loginStyle";
import axios from "axios";
import { API_URL } from "./Utils/constant";

/**
 * inisial form input state
 * @type {{ email: string, password: string}}
 */
const initialState = { _id: "", email: "", password: "" };

/**
 * sign in and sign up component
 * @returns {*}
 * @constructor
 */
const SignIn = () => {
  /**
   * import variable
   * @type {*}
   */
  const classes = loginStyle();
  let history = useHistory();

  /**
   * states
   */
  const [showPassword, setShowpassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(initialState);

  /**
   * password visibility togle
   */
  const handleShowPass = () => setShowpassword((prevShowPass) => !prevShowPass);

  /**
   * form submit
   * @param e
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`${API_URL}/userLogin/signin`, formData).then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        console.log(res.data.user);
        let user = res.data.user;
        if (!user.status) {
          window.location.replace("/resetuser");
        } else {
          if (user.accountType == 'admin') {
            window.location.replace("/home");
          } else {
            window.location.replace("/note");
          }
        }
      });
      // try {
      //   const { data } = await axios.get(
      //     `${API_URL}/userLogin/getUser/${formData._id}`
      //   );
      //   setData(data[0]);
      //   localStorage.setItem("userLogin", JSON.stringify({ formData: data[0] }));
      //   setData(null);
      // } catch (error) {
      //   console.log(error);
      // }
      // history.push("/home");
      console.log(formData);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * on text field value change
   * @param e
   */
  const onchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const validEmail = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    switch (name) {
      case "email":
        errors.email =
          value.length <= 0 ? "Email Can not be empty! Ex:- Example@gmail.com" : "";
        if (validEmail.test(value)) {
          errors.eid = "Enter valid Email! Ex:- Example@gmail.com";
        }
        break;
      case "password":
        errors.password = value.length <= 0 ? "Password can not be empty!" : "";

        break;
      default:
        break;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" className="container" maxWidth="md">
      <Paper className={classes.paper} maxWidth="mdx" elevation={3}>
        <div>
          <Avatar className={classes.avatar}>
            <LocalLibraryIcon />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
        </div>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <InputField
              name="email"
              label="Employee ID"
              handleOnchange={onchange}
              type="text"
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}

            <InputField
              name="password"
              label="Password"
              handleOnchange={onchange}
              type={showPassword ? "text" : "password"}
              handleShowPass={handleShowPass}
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.password}</span>
            )}
          </Grid>

          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <hr />
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;