import React, { useState, useEffect } from "react";
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
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import CustomSnackbar from "./CustomSnackbar";
import { ICustomSnackbar } from "../Interfaces/customSnackbar";
import { IColumns } from "../Interfaces/columns";
import { AxiosResponse } from "axios";

interface Record {
  _id: string;
  [key: string]: string | number | boolean;
}

interface ListingProps {
  columns: IColumns[];
  module: "Vehicle" | "Contact" | "Driver";
  records: Record[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => Promise<AxiosResponse | undefined>;
  apiAddEntity: string;
}

const Listing: React.FC<ListingProps> = ({
  columns,
  module,
  records,
  handleEdit,
  handleDelete,
  apiAddEntity,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState<{
    open: boolean;
    deleteId: string | null;
  }>({
    open: false,
    deleteId: null,
  });
  const [serachEntity, setSearchEntity] = useState("");
  const [filteredEntity, setFilteredEntity] = useState<Record[]>(records);
  const [snackbarOpen, setSnackbarOpen] = useState<ICustomSnackbar>({
    open: false,
    alertMessage: "",
    severity: "success",
  });
  const [deletedRecord, setDeletedRecord] = useState<Record | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchEntity(value);
  };

  useEffect(() => {
    const filteredData = records.filter((data) =>
      Object.values(data).some((value) =>
        value.toString().toLowerCase().includes(serachEntity.toLowerCase())
      )
    );
    setFilteredEntity(filteredData);
  }, [serachEntity, records]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (id: string) => {
    const recordToDelete = records.find((record) => record._id === id);
    if (recordToDelete) {
      setDeletedRecord(recordToDelete);
    }
    setDialogOpen({
      open: true,
      deleteId: id,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await handleDelete(dialogOpen.deleteId as string);
      if (response && response.status === 200) {
        const updatedRecords = filteredEntity.filter(
          (data) => data._id !== dialogOpen.deleteId
        );
        setFilteredEntity(updatedRecords);
        // Adjust the page if the current page would be empty
        const numPages = Math.ceil(updatedRecords.length / rowsPerPage);
        const newPage = Math.min(page, numPages - 1);
        setPage(newPage);

        setSnackbarOpen({
          open: true,
          alertMessage: `${module} successfully deleted. ${
            deletedRecord?.firstName && module === "Contact"
              ? "First Name: " + deletedRecord.firstName
              : deletedRecord?.make && module === "Vehicle"
              ? "Make : " + deletedRecord.make
              : deletedRecord?.firstName && module === "Driver"
              ? "First Name: " + deletedRecord.firstName
              : ""
          }`,
          severity: "success",
        });
        const snackbarDuration = 3000;
        setTimeout(() => {
          setSnackbarOpen({
            open: false,
            alertMessage: "",
            severity: "success",
          });
        }, snackbarDuration);
      }
    } catch (error) {
      console.error(`Error deleting ${module} :`, (error as Error).message);
    } finally {
      setDeletedRecord(null);
      setDialogOpen({ open: false, deleteId: dialogOpen.deleteId });
    }
  };

  const handleDeleteCancel = () => {
    setDeletedRecord(null);
    setDialogOpen({
      open: false,
      deleteId: null,
    });
  };

  return (
    <>
      <Head>
        <title>{module} List</title>
      </Head>
      <Box>
        <Box sx={{ m: 2 }}>
          <Typography
            variant="h4"
            sx={{ my: 3 }}
            align="center"
            fontWeight="bold"
          >
            {module} List
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Grid container>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Search "
                  variant="outlined"
                  size="small"
                  value={serachEntity}
                  onChange={handleSearchChange}
                />
              </Grid>
              <Grid
                item
                sm={6}
                md={6}
                sx={{
                  textAlign: isSmallScreen ? "start" : "end",
                  padding: isSmallScreen ? 2 : 0,
                }}
              >
                <Button variant="contained" href={apiAddEntity}>
                  Add {module}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Paper>
            <TableContainer
              component={Paper}
              style={{ minHeight: 421, overflow: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        minWidth: 10,
                        fontWeight: "bold",
                        background: "black",
                        color: "white",
                      }}
                    >
                      S.No
                    </TableCell>
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
                  {filteredEntity
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((record, index) => {
                      const rowNumber: number = index + 1 + page * rowsPerPage;
                      return (
                        <TableRow key={index + 1}>
                          <TableCell>{rowNumber}</TableCell>
                          {columns.map((column) => (
                            <TableCell key={column.id}>
                              {column.id === "wheeler" ||
                              column.id === "experience" ? (
                                <span>
                                  {(
                                    record[column.id] as unknown as string[]
                                  ).join(", ")}
                                </span>
                              ) : (
                                <span>{record[column.id]}</span>
                              )}
                            </TableCell>
                          ))}
                          <TableCell>
                            <Box style={{ display: "flex" }}>
                              <IconButton
                                color="primary"
                                onClick={() => handleEdit(record._id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                sx={{ color: "red" }}
                                onClick={() => handleDeleteClick(record._id)}
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
              count={filteredEntity.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
        <Dialog
          open={dialogOpen.open}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this <strong>{module}</strong> ?
              <br />
              {deletedRecord && (
                <>
                  {module === "Contact" && (
                    <>First Name: {deletedRecord.firstName} Record</>
                  )}
                  {module === "Vehicle" && (
                    <>Make : {deletedRecord.make} Record</>
                  )}
                  {module === "Driver" && (
                    <>First Name: {deletedRecord.firstName} Record</>
                  )}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              sx={{ color: "red" }}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {snackbarOpen.open && (
          <CustomSnackbar
            open={snackbarOpen.open}
            severity={snackbarOpen.severity}
            alertMessage={snackbarOpen.alertMessage}
          />
        )}
      </Box>
    </>
  );
};

export default Listing;
