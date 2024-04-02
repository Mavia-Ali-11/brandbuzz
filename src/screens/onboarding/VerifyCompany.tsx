import * as Yup from 'yup';
import { Formik, Form, FormikValues, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel, TextField } from '@mui/material';
import { dispatchStorage, getAuthSession } from '../../utils/common';
import { createPublisher } from '../../services/publisherServices';
import Notify from '../../helpers/NotificationHelper';
import logo from '../../assets/images/logo.png'
import { saveUser } from '../../services/authServices';

const VerifyCompany = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        addressLine1: Yup.string().required('Required'),
        addressLine2: Yup.string().required('Required'),
        postalCode: Yup.string().required('Required'),
        companyName: Yup.string().required('Required'),
        idNumber: Yup.string().required('Required'),
    });

    const initialValues: FormikValues = {
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        companyName: "",
        idNumber: ""
    };

    const handleSubmit = async (values: FormikValues) => {
        const user = await getAuthSession();
        const payload = {
            fullName: values.companyName,
            email: user.email,
            paymentDetails: {
                accountNumber: "123456",
                method: "paypal"
            }
        }

        try {
            const publisher = await createPublisher(payload);
            Notify.success(publisher.message);

            await saveUserRole(user);
        } catch (e: any) {
            Notify.error(e.response.data.message);
        }
    };

    const saveUserRole = async (user: any) => {
        try {
            await saveUser({ email: user.email, type: "publisher" });
            dispatchStorage("userRole", "new", "local");
            navigate('/welcome', { state: { role: "publisher" } });
        } catch (e: any) {
            Notify.error(e.response.data.message);
        }
    }

    return (
        <div className="min-h-[100vh] py-[50px] overflow-hidden relative roles_main">
            <div className="max-w-fit m-auto">
                <Link to="/">
                    <img src={logo} className="mr-[10px]" alt="logo" />
                </Link>
            </div>
            <div className="max-w-[70%] m-auto roles verify-main">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <div className="bg-white mx-[20px] rounded-[8px] p-[55px] mt-[40px] details-form">
                                <div>
                                    <h2 className="text-medium font-[700] mb-[25px] text-center">Let's Verify Your Company</h2>
                                    <p className='text-small text-black text-center'>
                                        Let us know what country you're based in, and your company details, and we'll get you setup in no-time
                                    </p>
                                    <div className='flex flex-wrap justify-between verify-form'>
                                        <div className='w-[48%]'>
                                            <div className='verify-company-select mt-[12px]'>
                                                <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                                                    <InputLabel>Country*</InputLabel>
                                                    <Select
                                                        labelId="country_dropdown"
                                                        id="country_dropdown"
                                                        defaultValue="Singapore"
                                                    >
                                                        <MenuItem value="Singapore">Singapore</MenuItem>
                                                        <MenuItem value="Pakistan">Pakistan</MenuItem>
                                                        <MenuItem value="USA">USA</MenuItem>
                                                        <MenuItem value="UAE">UAE</MenuItem>
                                                        <MenuItem value="Saudia Arabia">Saudia Arabia</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <>
                                                <Field name="addressLine1">
                                                    {({ field }: { field: any }) => (
                                                        <TextField
                                                            variant="standard"
                                                            label="Address Line 1*"
                                                            className="w-full !mt-[12px] verify-inp"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="addressLine1" component="span" className="error" />
                                            </>
                                            <>
                                                <Field name="addressLine2">
                                                    {({ field }: { field: any }) => (
                                                        <TextField
                                                            label="Address Line 2*"
                                                            variant="standard"
                                                            className="w-full !mt-[12px] verify-inp"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="addressLine2" component="span" className="error" />
                                            </>
                                            <>
                                                <Field name="postalCode">
                                                    {({ field }: { field: any }) => (
                                                        <TextField
                                                            label="Postal Code*"
                                                            variant="standard"
                                                            className="w-full !mt-[12px] verify-inp"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="postalCode" component="span" className="error" />
                                            </>
                                        </div>
                                        <div className='w-[48%]'>
                                            <>
                                                <Field name="companyName">
                                                    {({ field }: { field: any }) => (
                                                        <TextField
                                                            label="Company Name*"
                                                            variant="standard"
                                                            className="w-full !mt-[12px] verify-inp"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="companyName" component="span" className="error" />
                                            </>
                                            <>
                                                <Field name="idNumber">
                                                    {({ field }: { field: any }) => (
                                                        <TextField
                                                            label="Identification Number*"
                                                            variant="standard"
                                                            className="w-full !mt-[12px] verify-inp"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="idNumber" component="span" className="error" />
                                            </>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end roles_next">
                                    <PrimaryButton
                                        type="submit"
                                        text="Next"
                                        icon={<EastOutlinedIcon className="!text-[16px] ml-[4px]" />}
                                        className="text-[14px] max-w-[115px] mt-[30px]"
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default VerifyCompany