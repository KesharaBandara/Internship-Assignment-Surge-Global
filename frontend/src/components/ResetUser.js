import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import axios from "axios";
import { API_URL } from "./Utils/constant";
import { useHistory } from "react-router-dom";

//dialog box import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";

/**
 * draggable dialog component
 * @param {*} props
 * @returns
 */
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "85%",
    margin: "auto",
    marginTop: "20px",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const initialState = {
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
  },
};
const UpdateUser = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    dateOfBirth: '',
    password: "",
    status: true,
    errors: {
      email: "",
      password: "",
    },
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleOnSubmit = async (event) => {
    console.log('ss');

    event.preventDefault();
    setOpen(true);
    try {
      const { password, status } = state;
      console.log(password.trim());
      await setState({ ...state, status: true })

      if (password.trim() !== "") {
        console.log(state);
        let userdata = JSON.parse(localStorage.getItem('userData'));

        await axios
          .put(`${API_URL}/user/${userdata._id}`, state, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res);
            setSuccessMsg("Details Updated Successfully");
            if (userdata.accountType == 'admin') {
              history.push('/home')
            } else {
              history.push('/note')
            }
          })
          .catch((err) => {
            console.log(err);
            setErrorMsg("Please enter all the field values.");
          });
      } else {
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  const reload = () => {
    setState(initialState);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    const validEmail = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const validPassword = RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );

    switch (name) {
      case "email":
        errors.email =
          value.length <= 0
            ? "Email can not be empty! Ex :- jhon@mail.com"
            : "";
        if (!validEmail.test(value)) {
          errors.email = "Enter valid Email ! Ex:- jhon@mail.com";
        }
        break;
      case "password":
        errors.password = value.length <= 0 ? "Password can not be empty!" : "";

        if (!validPassword.test(value)) {
          errors.password =
            "Password must be cantain 1 Capital letter , 1 special charectar , 1 digit and 8 charectars long  ! Ex:- A@1aaaaa";
        }
        break;
      default:
        break;
    }
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { errors } = state;

  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem('userData'));
    console.log(userdata);
    setState({
      ...state,
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      mobile: userdata.mobile,
      dateOfBirth: moment(userdata.dateOfBirth).format('YYYY-MM-DD')
    })

  }, [])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square style={{ height: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Update Your Details
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <div className={classes.alert}>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle
                  style={{
                    cursor: "move",
                    backgroundColor: "#02032b",
                    color: "#ffffff",
                  }}
                  id="draggable-dialog-title"
                ></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {successMsg !== "" ? (
                      <>
                        <div style={{ color: "#008000" }}>
                          <CheckIcon />
                          {successMsg}
                        </div>
                      </>
                    ) : (
                        <>
                          <div style={{ color: "#aa202b" }}>
                            <ClearIcon />
                            {errorMsg}
                          </div>
                        </>
                      )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              value={state.firstName || ""}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              value={state.lastName || ""}
              onChange={handleInputChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              focused
              className='dobtxt'
              fullWidth
              type="date"
              id="email"
              label="Date Of Birth"
              name="dateOfBirth"
              value={state.dateOfBirth}
              onChange={handleInputChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile"
              name="mobile"
              autoComplete="mobile"
              autoFocus
              value={state.mobile || ""}
              onChange={handleInputChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              type='password'
              label="New Password"
              name="password"
              autoComplete="password"
              autoFocus
              value={state.password || ""}
              onChange={handleInputChange}
            />

            {errors.password.length > 0 && (
              <span className="error">{errors.password}</span>
            )}

            <div className={classes.btnGroup}>

              <Button
                id="btnSave"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.sub}
              >
                Save
              </Button>

            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default UpdateUser;
