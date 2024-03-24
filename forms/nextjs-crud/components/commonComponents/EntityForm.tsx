import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, FieldValues, useForm } from "react-hook-form";
import dayjs from "dayjs";
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
import style from "../../styles/form.module.css";
import CustomSnackbar from "./CustomSnackbar";
import { AxiosResponse } from "axios";
import { ICommonFieldForm } from "../Interfaces/commonFormsFields";
import { IRenderFields } from "../Interfaces/formsField";
import { ICustomSnackbar } from "../Interfaces/customSnackbar";
import { OptionData } from "../Interfaces/commonFormsFields";

// date provider
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Define the type for sx prop
interface InputLabelSxProps {
  fontWeight?: string;
  "&::after"?: {
    content?: string;
    color?: string;
    marginLeft?: string;
  };
}

// interface from EntityFormProps
interface EntityFormProps<IEntityForm> {
  module: string;
  apiEndPointPush: string;
  entityDataTypes: ICommonFieldForm;
  entityListData?: IEntityForm;
  entityValidations: Yup.ObjectSchema<FieldValues>;
  onSubmit: (
    data: FieldValues
  ) => Promise<AxiosResponse<IEntityForm> | undefined>;
}

const EntityForm = <IEntityForm extends object>({
  entityListData,
  module,
  entityDataTypes,
  entityValidations,
  onSubmit,
  apiEndPointPush,
}: EntityFormProps<IEntityForm>) => {
  const { title, fields } = entityDataTypes || {};
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState<ICustomSnackbar>({
    open: false,
    alertMessage: "",
    severity: "success",
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(entityValidations),
    defaultValues: entityListData || {}, // Provide default values to useForm
  });

  const formSubmit = async (entityData: FieldValues) => {
    let message = `${module} created successfully`;
    let severity: "success" | "error" = "success";
    let response;
    try {
      if (entityData._id) {
        message = `${module} updated successfully`;
        response = await onSubmit(entityData);
      } else {
        response = await onSubmit(entityData);
      }
    } catch (error) {
      console.log(error);
      message = "Request failed with status code 404";
      severity = "error";
      setTimeout(() => {
        setSnackbarOpen({
          open: false,
          alertMessage: "",
          severity: severity,
        });
      }, 2000);
    } finally {
      // Display success snackbar
      setSnackbarOpen({
        open: true,
        alertMessage: message,
        severity: severity,
      });

      // Redirect to the listing page after a short delay
      const snackbarDuration = 2000;
      setTimeout(() => {
        console.log("3000");
        router.push(`/${apiEndPointPush}`);
      }, snackbarDuration);
    }
  };

  const handleClear = () => reset();

  const inputLabelStyles: InputLabelSxProps = {
    fontWeight: "600",
    "&::after": {
      content: "'*'",
      color: "red",
      marginLeft: "4px",
    },
  };

  const renderFields = (fields: IRenderFields[]): React.JSX.Element[] => {
    return fields.map((field) => {
      const { type, label, id, fieldName, defaultValue, options, required } =
        field;

      switch (type) {
        case "text": {
          return (
            <Grid item xs={12} md={6}>
              <InputLabel sx={required ? inputLabelStyles : {}} htmlFor={id}>
                {label}
              </InputLabel>
              <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id={id}
                    type={type}
                    error={errors[fieldName] ? true : false}
                  />
                )}
              />
              {errors[fieldName] && (
                <FormHelperText error>
                  {errors[fieldName]?.message?.toString()}
                </FormHelperText>
              )}
            </Grid>
          );
        }

        case "select": {
          return (
            <Grid item xs={12} md={6}>
              <InputLabel sx={required ? inputLabelStyles : {}} id={id}>
                {label}
              </InputLabel>
              <FormControl fullWidth>
                <Controller
                  name={fieldName}
                  control={control}
                  defaultValue={defaultValue}
                  render={({ field }) => (
                    <Select
                      labelId={id}
                      fullWidth
                      {...field}
                      error={errors[fieldName] ? true : false}
                    >
                      {options?.map((option: OptionData) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.menuItem}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              {errors[fieldName] && (
                <FormHelperText error>
                  {errors[fieldName]?.message?.toString()}
                </FormHelperText>
              )}
            </Grid>
          );
        }

        case "date": {
          if (fieldName === "dob") {
            return (
              <Grid item xs={12} md={6}>
                <InputLabel sx={required ? inputLabelStyles : {}} htmlFor={id}>
                  {label}
                </InputLabel>
                <Controller
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                        maxDate={dayjs()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors[fieldName], // Set error prop based on the presence of errors
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors[fieldName] && (
                  <FormHelperText error>
                    {errors[fieldName]?.message?.toString()}
                  </FormHelperText>
                )}
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12} md={6}>
                <InputLabel sx={required ? inputLabelStyles : {}} htmlFor={id}>
                  {label}
                </InputLabel>
                <Controller
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                        minDate={dayjs()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors[fieldName], // Set error prop based on the presence of errors
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors[fieldName] && (
                  <FormHelperText error>
                    {errors[fieldName]?.message?.toString()}
                  </FormHelperText>
                )}
              </Grid>
            );
          }
        }

        case "checkbox": {
          if (fieldName === "isAgree") {
            return (
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  error={Boolean(errors[fieldName])}
                >
                  <FormGroup>
                    <Controller
                      name={fieldName}
                      control={control}
                      defaultValue={defaultValue}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              checked={field.value}
                              sx={required ? inputLabelStyles : {}}
                            />
                          }
                          label={
                            <Typography component="span">{label}</Typography>
                          }
                        />
                      )}
                    />
                  </FormGroup>
                  {errors[fieldName] && (
                    <FormHelperText>
                      {errors[fieldName]?.message?.toString()}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12}>
                <FormGroup row>
                  <Typography
                    variant="body1"
                    sx={{
                      m: 2,
                      ml: 0,
                      fontWeight: "600",
                      color: "rgba(0, 0, 0, 0.6)",
                      ...(required ? inputLabelStyles : {}),
                    }}
                  >
                    {label}
                  </Typography>
                  <Controller
                    name={fieldName}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                      <>
                        {options?.map((option) => (
                          <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={
                              <Checkbox
                                {...field}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const { checked } = e.target;
                                  const updatedValues = checked
                                    ? [...field.value, option]
                                    : field.value.filter(
                                        (val: {
                                          value: string | number;
                                          menuItem: string;
                                          disabled?: boolean | undefined;
                                        }) => val !== option
                                      );
                                  field.onChange(updatedValues);
                                }}
                              />
                            }
                            label={option}
                            checked={field.value.includes(option)}
                          />
                        ))}
                      </>
                    )}
                  />
                </FormGroup>
                {errors[fieldName] && (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors[fieldName]?.message?.toString()}
                  </FormHelperText>
                )}
              </Grid>
            );
          }
        }

        case "radio": {
          return (
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography
                  variant="h6"
                  color="black"
                  sx={required ? inputLabelStyles : {}}
                >
                  {label}
                </Typography>
                <Controller
                  name={fieldName}
                  control={control}
                  defaultValue={defaultValue}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      {options?.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.menuItem}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors[fieldName] && (
                  <FormHelperText error>
                    {errors[fieldName]?.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          );
        }

        case "textArea": {
          return (
            <Grid item xs={12}>
              <FormControl
                style={{ marginTop: 10, width: "100%" }}
                error={Boolean(errors[fieldName])}
              >
                <Typography>{label}</Typography>
                <Controller
                  name={fieldName}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      minRows={2}
                      className={style.textArea}
                    />
                  )}
                />
                {errors[fieldName] && (
                  <FormHelperText>
                    {errors[fieldName]?.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          );
        }

        default:
          return <h2>This type of not input text</h2>;
      }
    });
  };

  return (
    <Container component="main" sx={{ marginTop: 5 }}>
      <Paper elevation={3} className={style.inputFields}>
        <Typography fontWeight="700" fontSize="30px" textAlign="center" mb={3}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit(formSubmit)} className={style.formWidth}>
          <Grid container spacing={2}>
            {renderFields(fields)}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={style.btn}
          >
            {entityListData &&
            (entityListData as unknown as { _id: string })._id
              ? "Update"
              : "Submit"}
          </Button>
          <Button
            sx={{ marginRight: "10px" }}
            type="reset"
            variant="contained"
            color="warning"
            className={style.btn}
            onClick={handleClear} // Add onClick handler for clear button
          >
            Clear
          </Button>
        </form>
        <CustomSnackbar
          open={snackbarOpen.open}
          severity={snackbarOpen.severity}
          alertMessage={snackbarOpen.alertMessage}
        />
      </Paper>
    </Container>
  );
};
export default EntityForm;
