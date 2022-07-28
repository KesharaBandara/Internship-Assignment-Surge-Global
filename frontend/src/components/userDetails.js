import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./Utils/constant";
import "./viewUser.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import moment from 'moment'
import Alert from "@material-ui/lab/Alert";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Editable = (props) => {
  const { useState } = React;
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);
  const [issucc, setIssucc] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [rowDataModal, setRowDataModal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    accountType: "",
    password: "",
    dateOfBirth: "",
  })

  const handleClickOpen = (data) => {
    console.log(data);
    setRowDataModal({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      accountType: data.accountType,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
    })
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //get all book details
  useEffect(() => {
    const getFileList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/user/getAllUsers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setErrorMsg("");
        setData(data);
        console.log(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
        console.log(error);
      }
    };

    getFileList();

    console.log(data);
  }, []);

  const [columns, setColumns] = useState([
    { title: "First Name", field: "firstName" },
    { title: "Email", field: "email" },
  ]);

  /////////////////////////update rows
  const api = axios.create({
    baseURL: `http://localhost:8070`,
  });

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.firstName === "") {
      errorList.push("Please enter First Name");
    }
    if (newData.email === "") {
      errorList.push("Please enter email");
    }

    if (errorList.length < 1) {
      api
        .put("/user/" + newData._id, newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
        })
        .catch((error) => {
          setErrorMsg(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMsg(errorList);
      setIserror(true);
      resolve();
    }
  };

  ////////////Delete Row

  const handleRowDelete = (oldData, resolve) => {
    api
      .delete("/user/" + oldData._id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        setSuccessMsg(["Delete success"]);
        setIssucc(true);
      })
      .catch((error) => {
        setErrorMsg(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div>
      <br />
      <br />
      <h1 id="h12" align="center">
        User Details
      </h1>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          User Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>First Name: </b>{rowDataModal.firstName}<br />
            <b>last Name: </b>{rowDataModal.lastName}<br />
            <b>Email: </b>{rowDataModal.email}<br />
            <b>Mobile: </b>{rowDataModal.mobile}<br />
            <b>Account Type: </b>{rowDataModal.accountType}<br />
            <b>Date Of Birth: </b>{moment(rowDataModal.dateOfBirth).format('DD-MM-YYYY')}<br />
          </Typography>
        </DialogContent>
      </BootstrapDialog>

      <div className="tbl">
        <div>
          {iserror && (
            <Alert severity="error">
              {errorMsg.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}

          {issucc && (
            <Alert severity="success">
              {successMsg.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}
        </div>

        <MaterialTable
          title={
            <Button
              id="btnAdd"
              variant="contained"
              color="primary"
              href="/adduser"
            >
              Add new User
            </Button>
          }
          columns={columns}
          data={data}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
          onRowClick={(event, rowData) => handleClickOpen(rowData)}
          // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
          options={{
            headerStyle: {
              backgroundColor: "rgba(8, 9, 80, 0.363)",
              color: "rgba(0, 0, 0)",
            },
            actionsColumnIndex: -1,
            rowStyle: rowData => ({
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
            })
          }}
        />
      </div>
    </div>
  );
};

export default Editable;