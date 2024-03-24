import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  TextareaAutosize,
  FormHelperText,
} from "@mui/material";
import VehicleDataValidation from "../validation/VehicleValidation";
import style from "./vehicle.module.css";
const VehicleForm = () => {
  const { id } = useParams(""); // Get the ID from the URL parameters
  const [VehiclesFormData, setVehiclesFormData] = useState([]);
  const [vehicleEdit, setVehicleEdit] = useState(null);
  const navigate = useNavigate("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [severity, setSeverity] = useState(null);
  const {
    control,
    watch,
    reset,
    handleSubmit,
    register,
    setValue, // Add setValue function from react-hook-form
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VehicleDataValidation),
  });

  const manufacturedYear = watch("manufacturedYear");
  const vehicleBodyType = watch("vehicleBodyType");
  const transmission = watch("transmission");
  const wheeler = watch("wheeler");
  const isAgree = watch("isAgree");

  useEffect(() => {
    const vehicleData = JSON.parse(localStorage.getItem("formData")) || [];
    setVehiclesFormData(vehicleData);
    // Check if ID is provided in the URL (edit case)
    if (id) {
      const editVehicleData = vehicleData.find(
        (vehicle, index) => index === parseInt(id - 1, 10)
      );
      if (!editVehicleData) {
        // Show an alert if ID is greater than available data
        if (parseInt(id, 10) > vehicleData.length) {
          showSnackbar("Vehicle does not exist ", "error");
          const snackbarDuration = 2000;

          setTimeout(() => {
            navigate("/addvehicle");
          }, snackbarDuration);
        }
        // Redirect to error page if ID is negative
        if (parseInt(id, 10) <= 0) {
          navigate(`/error`); // Update this path based on your error page route
        }
      }
      if (editVehicleData) {
        setVehicleEdit(editVehicleData);
        // Use setValue to set the form values
        Object.keys(editVehicleData).forEach((key) => {
          setValue(key, editVehicleData[key]);
        });
      }
    }
  }, [id, setValue]);

  const handleSnackbarClose = (event, action) => {
    if (action === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSuccessMessage(message);
    setSnackbarOpen(true);
    setSeverity(severity);
    setTimeout(() => {
      // Navigate to the listing page after 2000 milliseconds (2 seconds)
      navigate(`/listing`);
    }, 2000);
  };

  const onSubmit = (vehicle) => {
    let message = "";
    let vehiclesData = [];
    if (Object.keys(errors).length === 0) {
      if (vehicleEdit) {
        vehiclesData = VehiclesFormData.map((singleVehicle, index) =>
          index === parseInt(id - 1, 10)
            ? { ...singleVehicle, ...vehicle }
            : singleVehicle
        );
        message = "Vehicle updated successfully ";
      } else {
        vehiclesData = [...VehiclesFormData, { ...vehicle }];
        message = "Vehicle created successfully ";
      }
    }
    localStorage.setItem("formData", JSON.stringify(vehiclesData));
    setVehiclesFormData(vehiclesData);
    showSnackbar(message, "success");
  };

  const handleClear = () => {
    // Use the reset function to clear the form values and errors
    reset();
  };
  
  const inputLabelStyles = {
    fontWeight: "600",
    "&::after": {
      content: "'*'",
      color: "red",
      marginLeft: "4px",
    },
  };

  return (
    <>
      <Container component="main" sx={{ marginTop: 5 }}>
        <Paper elevation={3} className={style.inputFields}>
          <Typography
            fontWeight="700"
            fontSize="30px"
            textAlign="center"
            mb={3}
          >
            Add Vehicle
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={style.formWidth}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputLabel sx={inputLabelStyles} htmlFor="Make">
                  Make
                </InputLabel>
                <TextField
                  fullWidth
                  id="Make"
                  type="text"
                  {...register("make")}
                  error={errors.make ? true : false}
                />
                {errors.make && (
                  <FormHelperText error>{errors.make.message}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={inputLabelStyles}
                  id="model-label"
                  htmlFor="Model"
                >
                  Model
                </InputLabel>
                <TextField
                  labelid="model-label"
                  fullWidth
                  id="Model"
                  {...register("model")}
                  type="text"
                  error={errors.model ? true : false}
                />
                {errors.model && (
                  <FormHelperText error>{errors.model.message}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  sx={inputLabelStyles}
                  htmlFor="vehicle-identification-number"
                >
                  Vehicle Identification No
                </InputLabel>
                <TextField
                  fullWidth
                  id="vehicle-identification-number"
                  {...register("vehicleIdentificationNumber")}
                  type="text"
                  error={errors.vehicleIdentificationNumber ? true : false}
                />
                {errors.vehicleIdentificationNumber && (
                  <FormHelperText error>
                    {errors.vehicleIdentificationNumber.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={inputLabelStyles} htmlFor="engine-number">
                  Engine Number
                </InputLabel>
                <TextField
                  fullWidth
                  id="engine-number"
                  type="text"
                  {...register("engineNumber")}
                  error={errors.engineNumber ? true : false}
                />
                {errors.engineNumber && (
                  <FormHelperText error>
                    {errors.engineNumber.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={inputLabelStyles} id="vehicle-body-type-label">
                  Vehicle Body Type
                </InputLabel>
                <Select
                  labelId="vehicle-body-type-label"
                  fullWidth
                  defaultValue={0}
                  value={vehicleBodyType ? vehicleBodyType : 0}
                  id="vehicle-body-type"
                  {...register("vehicleBodyType")}
                  error={errors.vehicleBodyType ? true : false}
                >
                  <MenuItem value="0" disabled>
                    Select the vehicle body type
                  </MenuItem>
                  <MenuItem value={"Van/Minivan"}>Van/Minivan</MenuItem>
                  <MenuItem value={"Wagon"}>Wagon</MenuItem>
                  <MenuItem value={"Hybrid Vehicle"}>Hybrid Vehicle</MenuItem>
                  <MenuItem value={"Sedan"}>Sedan</MenuItem>
                </Select>
                {errors.vehicleBodyType && (
                  <FormHelperText error>
                    {errors.vehicleBodyType.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={inputLabelStyles} id="manufactured-year-label">
                  Manufactured Year
                </InputLabel>
                <Select
                  fullWidth
                  labelId="manufactured-year-label"
                  id="manufactured-year"
                  defaultValue={0}
                  value={manufacturedYear ? manufacturedYear : 0}
                  {...register("manufacturedYear")}
                  error={errors.manufacturedYear ? true : false}
                >
                  <MenuItem value="0" disabled>
                    Select the manufactured year
                  </MenuItem>
                  <MenuItem value={"1997"}>1997</MenuItem>
                  <MenuItem value={"1998"}>1998</MenuItem>
                  <MenuItem value={"1999"}>1999</MenuItem>
                  <MenuItem value={"2000"}>2000</MenuItem>
                  <MenuItem value={"2001"}>2001</MenuItem>
                </Select>
                {errors.manufacturedYear && (
                  <FormHelperText error>
                    {errors.manufacturedYear.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={inputLabelStyles} id="transmission-label">
                  Transmission
                </InputLabel>
                <Select
                  fullWidth
                  defaultValue={0}
                  value={transmission ? transmission : 0}
                  labelId="transmission-label"
                  id="transmission"
                  {...register("transmission")}
                  error={errors.transmission ? true : false}
                >
                  <MenuItem value="0" disabled>
                    Select the transmission
                  </MenuItem>
                  <MenuItem value={"Automatic"}>Automatic</MenuItem>
                  <MenuItem value={"Manual"}>Manual</MenuItem>
                </Select>{" "}
                {errors.transmission && (
                  <FormHelperText error>
                    {errors.transmission.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={inputLabelStyles}>Odometer Reading</InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="odometer-reading"
                  {...register("odometerReading")}
                  type="text"
                  error={errors.odometerReading ? true : false}
                />
                {errors.odometerReading && (
                  <FormHelperText error>
                    {errors.odometerReading.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={inputLabelStyles} htmlFor="reg-expiry">
                  Reg Expiry
                </InputLabel>
                <TextField
                  fullWidth
                  id="reg-expiry"
                  {...register("regExpiry")}
                  type="date"
                  error={errors.regExpiry ? true : false}
                  inputProps={{
                    shrink: true,
                    min: dayjs().format("YYYY-MM-DD"),
                  }}
                />
                {errors.regExpiry && (
                  <FormHelperText error>
                    {errors.regExpiry.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel sx={inputLabelStyles} htmlFor="license-plate">
                  License Plate
                </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="license-plate"
                  {...register("licensePlate")}
                  type="text"
                  error={errors.licensePlate ? true : false}
                />
                {errors.licensePlate && (
                  <FormHelperText error>
                    {errors.licensePlate.message}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormGroup row>
                  <Typography
                    variant="body1"
                    sx={{
                      m: 2,
                      ml: 0,
                      fontWeight: "600",
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Types of vehicles :
                  </Typography>
                  <FormControlLabel
                    value="4 Wheeler"
                    control={<Checkbox {...register("wheeler")} />}
                    label="4 Wheeler"
                    checked={wheeler ? wheeler.includes("4 Wheeler") : false}
                  />
                  <FormControlLabel
                    value="3 Wheeler"
                    control={<Checkbox {...register("wheeler")} />}
                    label="3 Wheeler"
                    checked={wheeler ? wheeler.includes("3 Wheeler") : false}
                  />
                  <FormControlLabel
                    value="2 Wheeler"
                    control={<Checkbox {...register("wheeler")} />}
                    label="2 Wheeler"
                    checked={wheeler ? wheeler.includes("2 Wheeler") : false}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} display="flex" direction="column">
                <FormControl
                  component="fieldset"
                  error={Boolean(errors.radioButtonsGroup)}
                >
                  <Typography variant="h6" color="black">
                    Odometer Reading
                  </Typography>
                  <Controller
                    name="radioButtonsGroup"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="Reflects the actual mileage"
                          control={<Radio />}
                          label="Reflects the actual mileage"
                        />
                        <FormControlLabel
                          value="Does not reflect the actual mileage"
                          control={<Radio />}
                          label="Does not reflect the actual mileage"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.radioButtonsGroup && (
                    <FormHelperText>
                      {errors.radioButtonsGroup.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  style={{ marginTop: 16 }}
                  error={Boolean(errors.textArea)}
                >
                  <Typography>
                    If it does not reflect the actual mileage, please explain
                    here:
                  </Typography>
                  <Controller
                    name="textArea"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextareaAutosize
                        {...field}
                        rows={4}
                        className={style.textArea}
                      />
                    )}
                  />
                  {errors.textArea && (
                    <FormHelperText>{errors.textArea.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("isAgree")}
                        checked={isAgree === true}
                        // Remove error prop from Checkbox
                      />
                    }
                    label={
                      <Typography
                        component="span"
                        sx={{
                          "&::after": {
                            content: "'*'",
                            color: "red",
                            marginLeft: "4px",
                          },
                        }}
                      >
                        I agree to the terms & condition
                      </Typography>
                    }
                  />
                  {errors.isAgree && (
                    <Typography variant="body2" color="error">
                      {errors.isAgree.message}
                    </Typography>
                  )}
                </FormGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={style.btn}
            >
              Submit
            </Button>
            <Button
              sx={{ marginRight: "10px" }}
              type="button"
              variant="contained"
              color="warning"
              className={style.btn}
              onClick={handleClear} // Add onClick handler for clear button
            >
              Clear
            </Button>
          </form>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity={severity} // Use the severity from the state
            >
              {successMessage}
            </MuiAlert>
          </Snackbar>
        </Paper>
      </Container>
    </>
  );
};
export default VehicleForm;
