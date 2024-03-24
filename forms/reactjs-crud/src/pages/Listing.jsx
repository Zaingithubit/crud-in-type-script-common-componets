import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  TextField,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";

const columns = [
  { id: "id", label: "ID", minWidth: 10 },
  { id: "make", label: "Make", minWidth: 55 },
  { id: "model", label: "Model", minWidth: 55 },
  { id: "vin", label: "Vehicle Identification Number", minWidth: 210 },
  { id: "engineNumber", label: "Engine Number", minWidth: 120 },
  { id: "vehicleBodyType", label: "Vehicle Body Type", minWidth: 150 },
  { id: "mnufacturedYear", label: "Manufactured Year", minWidth: 150 },
  { id: "transmission", label: "Transmission", minWidth: 100 },
  { id: "odometerReading", label: "Odometer Reading", minWidth: 150 },
  { id: "regExpiry", label: "Reg Expiry", minWidth: 100 },
  { id: "licensePlate", label: "License Plate", minWidth: 100 },
  { id: "wheelers", label: "Wheelers", minWidth: 70 },
  // Add more columns as needed
];

const Listing = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [serachVehicle, setSearchVehicle] = useState("");
  const [filteredVehile, setFilteredVehicle] = useState(tableData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchVehicle(value);
  };

  useEffect(() => {
    const vehiclesData = JSON.parse(localStorage.getItem("formData")) || [];
    setTableData(vehiclesData);
  }, []);

  useEffect(() => {
    const filteredVehicle = tableData.filter((vehicle) =>
      Object.values(vehicle).some((value) =>
        value.toString().toLowerCase().includes(serachVehicle.toLowerCase())
      )
    );
    setFilteredVehicle(filteredVehicle);
  }, [serachVehicle, tableData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Editing row with ID: ${id}`);
    navigate(`/addvehicle/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteDialogOpen(true);
    setSelectedDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting row with ID: ${selectedDeleteId}`);
    const updatedData = tableData.filter(
      (vehicle, index) => index + 1 !== selectedDeleteId
    );
    setTableData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setDeleteDialogOpen(false);

    // Show Snackbar
    showSnackbar("Vehicle successfully deleted ", "success");
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedDeleteId(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, action) => {
    if (action === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Box sx={{ m: 2 }}>
        <Typography
          variant="h4"
          sx={{ my: 3 }}
          align="center"
          fontWeight="bold"
        >
          Vehicles List
        </Typography>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Search "
            variant="outlined"
            size="small"
            value={serachVehicle}
            onChange={handleSearchChange}
          />
        </Box>
        <Paper>
          <TableContainer
            component={Paper}
            style={{ minHeight: 400, overflow: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        background: "black",
                        color: "white",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      background: "black",
                      color: "white",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVehile
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((vehicle, index) => {
                    const rowNumber = index + 1 + page * rowsPerPage;
                    return (
                      <TableRow key={rowNumber}>
                        <TableCell>{rowNumber}</TableCell>
                        <TableCell>{vehicle.make}</TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>{vehicle.vehicleIdentificationNumber}</TableCell>
                        <TableCell>{vehicle.engineNumber}</TableCell>
                        <TableCell>{vehicle.vehicleBodyType}</TableCell>
                        <TableCell>{vehicle.manufacturedYear}</TableCell>
                        <TableCell>{vehicle.transmission}</TableCell>
                        <TableCell>{vehicle.odometerReading}</TableCell>
                        <TableCell>{vehicle.regExpiry}</TableCell>
                        <TableCell>{vehicle.licensePlate}</TableCell>
                        <TableCell>
                          {vehicle.wheeler
                            ? vehicle.wheeler.join(",  ")
                            : "undefine"}
                        </TableCell>
                        <TableCell>
                          <Box style={{ display: "flex" }}>
                            <IconButton
                              onClick={() =>
                                handleEdit(page * rowsPerPage + index + 1)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleDeleteClick(
                                  page * rowsPerPage + index + 1
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this vehicle
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity} // Use the severity from the state
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Listing;
