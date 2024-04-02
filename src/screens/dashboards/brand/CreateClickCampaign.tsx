import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { InputAdornment } from "@mui/material";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CheckBoxInput, PrimaryButton } from "../../../components";
import { Dayjs } from 'dayjs';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import * as Yup from 'yup';
import { Formik, Form, FormikValues, FormikHelpers, Field, ErrorMessage } from "formik";
import { getActivePublishers } from "../../../services/publisherServices";
import { createCampaign } from "../../../services/brandServices";
import Notify from '../../../helpers/NotificationHelper';
import { getAuthSession } from "../../../utils/common";

type PublisherState = {
  id: string;
  fullName: string;
};

type DateTimeState = { [key: string]: Dayjs | any };

const CreateClickCampaign = () => {
  const navigate = useNavigate();

  const [publishers, setPublishers] = useState<PublisherState[]>([]);
  const [dateTime, setDateTime] = useState<DateTimeState>({
    "startingDate": null,
    "startingTime": null,
    "endingDate": null,
    "endTime": null
  });

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    const publishers = await getActivePublishers();
    setPublishers(publishers);
  }

  const handleDateTimeChange = (key: string, value: Dayjs | any) => {
    const dateTimeCopy = { ...dateTime };
    dateTimeCopy[key] = value;
    setDateTime(dateTimeCopy);
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    brand: Yup.string().required('Required'),
    referenceLink: Yup.string().required('Required'),
    budget: Yup.string().required('Required'),
    headline: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    startingDate: Yup.string().required('Required'),
    endingDate: Yup.string().required('Required'),
    startingTime: Yup.string().required('Required'),
    endTime: Yup.string().required('Required'),
    publishers: Yup.array().min(1, 'Select at-least 1 publisher'),
  });

  const initialValues: FormikValues = {
    name: "",
    brand: "",
    referenceLink: "",
    budget: "",
    headline: "",
    description: "",
    startingDate: null,
    startingTime: null,
    endingDate: null,
    endTime: null,
    publishers: []
  };

  const handleSubmit = async (values: FormikValues, { resetForm }: FormikHelpers<FormikValues>) => {
    const { startingDate, startingTime, endingDate, endTime, publishers, ...rest } = values;
    const user = await getAuthSession();

    const payload = {
      userEmail: user.email,
      paymentModel: "CPC",
      publishers: publishers.map((id: string) => ({ id })),
      startingDate: startingDate.format('YYYY-MM-DD') + "T" + startingTime.format('HH:mm'),
      endingDate: endingDate.format('YYYY-MM-DD') + "T" + endTime.format('HH:mm'),
      ...rest
    }

    try {
      const result = await createCampaign(payload);
      Notify.success(result.message);
      resetForm();
      setDateTime({
        "startingDate": null,
        "startingTime": null,
        "endingDate": null,
        "endTime": null
      });
      navigate("/brand/post-article");
    } catch (e: any) {
      Notify.error(e.response.data.message);
    }
  };

  return (
    <>
      <div className='!min-h-[110px] !pl-0 flex items-center'>
        <h2 className='text-black text-large font-[700]'>Create Campaign</h2>
      </div>

      <div className="rounded-[5px] bg-dark_orange p-[3px] flex items-center max-w-fit">
        <Link
          to="/brand/create-clicks-campaign"
          className="rounded-[5px] bg-white w-[145px] pt-[10px] pb-[8px] text-center text-small text-dark_orange font-[500]">
          Clicks Campaigns
        </Link>
        <Link
          to="/brand/single-article"
          className="rounded-[5px] bg-dark_orange w-[145px] pt-[10px] pb-[8px] text-center text-small text-white font-[500]">
          Single Article
        </Link>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex justify-content-between mt-[15px] campaign-form">
              <div className="w-[35%]">
                <>
                  <Field name="name">
                    {({ field }: { field: any }) => (
                      <TextField
                        label="Campaign Name"
                        variant="standard"
                        className="campaign_std_field"
                        placeholder="Input text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="name" component="span" className="error" />
                </>
                <>
                  <Field name="brand">
                    {({ field }: { field: any }) => (
                      <TextField
                        label="Brand"
                        variant="standard"
                        className="campaign_std_field"
                        placeholder="Input text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="brand" component="span" className="error" />
                </>
                <>
                  <Field name="referenceLink">
                    {({ field }: { field: any }) => (
                      <TextField
                        label="Reference Link"
                        variant="standard"
                        className="campaign_std_field"
                        placeholder="Input text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="referenceLink" component="span" className="error" />
                </>
                <>
                  <Field name="budget">
                    {({ field }: { field: any }) => (
                      <TextField
                        type="number"
                        label="Set Your CPC"
                        variant="standard"
                        placeholder="$1.20"
                        className="campaign_std_field"
                        InputProps={{
                          startAdornment:
                            <InputAdornment position="start">
                              <PaymentsOutlinedIcon className="text-small" />
                            </InputAdornment>,
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                  <div>
                    <span className="text-black text-small w-[88%] mt-[10px] inline-block">
                      $1.20 is recommended. Set higher to incentivise publishers
                    </span>
                  </div>
                  <ErrorMessage name="budget" component="span" className="error" />
                </>

                <div className="mt-[35px]">
                  <h2 className="text-large font-[700]">Select Publishers</h2>
                  <p>Publishers we recommend for <b>you:</b></p>
                  <div className="ml-[10px] mt-[15px]">
                    {
                      publishers.map(({ id, fullName }, key) => (
                        <div className="mt-[10px]" key={key}>
                          <Field name="publishers">
                            {({ field }: { field: any }) => {
                              const updatedField = { ...field, value: id };
                              return (
                                <FormControlLabel
                                  className="text-black checkbox_label"
                                  control={<CheckBoxInput {...updatedField} />}
                                  label={fullName}
                                  checked={values.publishers.includes(id)}
                                />
                              )
                            }}
                          </Field>
                        </div>
                      ))
                    }
                  </div>
                  <ErrorMessage name="publishers" component="span" className="error" />
                </div>
              </div>
              <div className="w-[65%]">
                <>
                  <Field name="headline">
                    {({ field }: { field: any }) => (
                      <TextField
                        label="Headline"
                        variant="standard"
                        className="campaign_std_field full-width"
                        placeholder="Input text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="headline" component="span" className="error" />
                </>

                <div className="campaign_std_field full-width">
                  <h6>Description</h6>
                  <>
                    <Field name="description">
                      {({ field }: { field: any }) => (
                        <textarea className="block" placeholder="Tell us about this campaign" {...field} />
                      )}
                    </Field>
                    <ErrorMessage name="description" component="span" className="error" />
                  </>
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="flex justify-between campaign_std_field full-width date-and-time">
                    <div className="w-[46%]">
                      <h6>Start Date</h6>
                      <div className="flex">
                        <div className="mr-[20px]">
                          <DatePicker
                            className="date_picker"
                            onChange={(e: any) => {
                              setFieldValue("startingDate", e);
                              handleDateTimeChange("startingDate", e);
                            }}
                            value={dateTime.startingDate}
                            disablePast
                          />
                          <ErrorMessage name="startingDate" component="span" className="error" />
                        </div>
                        <div>
                          <TimePicker
                            className="date_picker"
                            onChange={(e: any) => {
                              setFieldValue("startingTime", e);
                              handleDateTimeChange("startingTime", e);
                            }}
                            value={dateTime.startingTime}
                          />
                          <ErrorMessage name="startingTime" component="span" className="error" />
                        </div>
                      </div>
                    </div>
                    <div className="w-[46%]">
                      <h6>End Date</h6>
                      <div className="flex">
                        <div className="mr-[20px]">
                          <DatePicker
                            className="date_picker"
                            onChange={(e: any) => {
                              setFieldValue("endingDate", e);
                              handleDateTimeChange("endingDate", e);
                            }}
                            value={dateTime.endingDate}
                            disablePast
                          />
                          <ErrorMessage name="endingDate" component="span" className="error" />
                        </div>
                        <div>
                          <TimePicker
                            className="date_picker"
                            onChange={(e: any) => {
                              setFieldValue("endTime", e);
                              handleDateTimeChange("endTime", e);
                            }}
                            value={dateTime.endTime}
                          />
                          <ErrorMessage name="endTime" component="span" className="error" />
                        </div>
                      </div>
                    </div>
                  </div>
                </LocalizationProvider>

                {/* <div className="publisher-dropdown full-width mt-[100px]">
                  <span className="text-black text-small text-small w-[88%] mt-[10px] inline-block">
                    Select from all publisher if you'd like:
                  </span>
                  {
                    publishers?.[0]?.id &&
                    <FormControl variant="standard" sx={{ minWidth: 220 }}>
                      <Select
                        labelId="publisher_dropdown"
                        id="publisher_dropdown"
                        defaultValue={publishers?.[0]?.id}
                      >
                        {
                          publishers.map(({ id, fullName }, key) => (
                            <MenuItem value={id} key={key}>{fullName}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  }
                </div> */}
              </div>
            </div>

            <div className="flex justify-end my-[50px]">
              <PrimaryButton
                type="submit"
                text="Next"
                icon={<EastOutlinedIcon className="!text-[20px] ml-[4px]" />}
                className="text-[18px] max-w-[115px]" />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CreateClickCampaign