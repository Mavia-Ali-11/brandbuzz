import * as Yup from 'yup';
import { Formik, Form, FormikValues, Field, ErrorMessage } from "formik";
import { TextInputs, PasswordInput, PrimaryButton } from "../../components"
import { Link, useNavigate } from "react-router-dom"
import { Google, FacebookRounded, Apple } from '@mui/icons-material';
import logo from '../../assets/images/logo.png'
import signupSide from '../../assets/images/signup-graphics.png'
import Notify from '../../helpers/NotificationHelper';
import { authUserWithGoogle, findUser, registerUser } from '../../services/authServices';
import { dispatchStorage } from '../../utils/common';

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .required('Required')
      .min(9, "Weak password: Less than 9 characters"),
  });

  const initialValues: FormikValues = { fullName: "", email: "", password: "" };

  const handleSubmit = async (values: FormikValues) => {
    const { email, password } = values;

    try {
      const user = await registerUser(email, password);
      if (user) {
        Notify.success("Sign up successful");
        navigate("/role");
      }
    } catch (e: any) {
      Notify.error(e.message);
    }
  };

  const authenticateByGoogle = async () => {
    try {
      const user = await authUserWithGoogle();
      if (user) await getUserRole(user.email);
    } catch (e) {
      Notify.error("Google access denied");
    }
  }

  const getUserRole = async (email: any) => {
    try {
      const result = await findUser(email);
      dispatchStorage("userRole", result.type.toLowerCase(), "local");

      if (result.type === "PUBLISHER") navigate("/publisher");
      else navigate("/brand");
    } catch (e: any) {
      Notify.success("Sign up successful");
      navigate("/role");
    }
  }


  return (
    <div className="flex min-h-screen auth-screen">
      <div className="flex flex-col items-center justify-between w-[50%] min-h-[100%] p-[20px]">
        <div className="flex flex-wrap items-center justify-between w-full mb-[25px] head">
          <Link to="/">
            <img src={logo} className="mr-[10px]" alt="logo" />
          </Link>
          <div>
            <span className="text-black text-small">Already have an account? {" "}
              <Link to="/login" className="underline text-dark_orange duration-300 hover:text-hover_orange">Sign in</Link>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="text-center w-[400px]">
            <h2 className="text-black text-large font-[700] mb-[25px]">Create an account</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="mb-[20px]">
                    <Field name="fullName">
                      {({ field }: { field: any }) => (
                        <TextInputs
                          type="text"
                          label="Full name"
                          placeholder="John Doe"
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="fullName" component="span" className="error" />
                  </div>
                  <div className="mb-[20px]">
                    <Field name="email">
                      {({ field }: { field: any }) => (
                        <TextInputs
                          type="email"
                          label="Email"
                          placeholder="example.email@gmail.com"
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="email" component="span" className="error" />
                  </div>
                  <div>
                    <Field name="password">
                      {({ field }: { field: any }) => (
                        <PasswordInput
                          placeholder="Enter at least 8+ characters"
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="password" component="span" className="error" />
                  </div>
                  <div className="mt-[30px]">
                    <PrimaryButton type="submit" text="Sign up" />
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-[30px]">
              <p className="text-gray text-small">Or sign up with</p>
              <div className="flex justify-center mt-[10px]">
                <div
                  className="bg-[#FEF1F1FF] hover:bg-[#FBD2D0FF] duration-300 w-[80px] mr-[10px] p-[6px] rounded-[18px] cursor-pointer"
                  onClick={authenticateByGoogle}>
                  <Google className="text-[#C71610FF]" style={{ fontSize: "18px" }} />
                </div>
                <div className="bg-[#F3F6FBFF] hover:bg-[#D9E2F3FF] duration-300 w-[80px] mr-[10px] p-[6px] rounded-[18px] cursor-pointer">
                  <FacebookRounded className="text-[#335CA6FF]" style={{ fontSize: "18px" }} />
                </div>
                <div className="bg-[#F3F4F6FF] hover:bg-[#DEE1E6FF] duration-300 w-[80px] mr-[10px] p-[6px] rounded-[18px] cursor-pointer">
                  <Apple className="text-[#565D6DFF]" style={{ fontSize: "18px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-silver text-small mt-[20px]">
          <p>By signing up, you agree with the</p>
          <Link to="/signup" className="underline">Terms of Use</Link> & {" "}
          <Link to="/signup" className="underline">Privacy Policy</Link>
        </div>
      </div>

      <div className="flex items-center justify-center w-[50%] bg-[#FF915AFF] overflow-hidden design-props">
        <div className="text-center">
          <img src={signupSide} alt="" />
          <h4 className="text-[#6F7787FF] text-[24px] font-[700]">Voluptate dolor tempor</h4>
          <span className="text-[#6F7787FF]">Minim cupidatat cillum</span>
        </div>
      </div>
    </div>
  )
}

export default Signup