import * as Yup from 'yup';
import { Formik, Form, FormikValues, Field, ErrorMessage } from "formik";
import { TextInputs, PasswordInput, CheckBoxInput, PrimaryButton } from "../../components";
import { Link, useNavigate } from "react-router-dom"
import { Google, FacebookRounded, Apple, Twitter, LinkedIn, YouTube } from '@mui/icons-material';
import { authUserWithGoogle, findUser, loginUser } from '../../services/authServices';
import Notify from '../../helpers/NotificationHelper';
import logo from '../../assets/images/logo.png'
import loginLady from '../../assets/images/login-lady.png'
import ribbonProp from '../../assets/images/ribbon-prop.png'
import dottedCircle from '../../assets/images/dotted-circle-prop.png'
import userAvatar from '../../assets/images/login-avatar.png'
import talentsIcon from '../../assets/images/talents-icon.png'
import { dispatchStorage } from '../../utils/common';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  });

  const initialValues: FormikValues = { email: "", password: "" };

  const handleSubmit = async (values: FormikValues) => {
    const { email, password } = values;

    try {
      const user = await loginUser(email, password);
      if (user) {
        Notify.success("Login successful");
        await getUserRole(email);
      }
    } catch (e: any) {
      Notify.error(e.message);
    }
  };

  const authenticateByGoogle = async () => {
    try {
      const user = await authUserWithGoogle();
      if (user) {
        Notify.success("Login successful");
        await getUserRole(user.email);
      }
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
      navigate("/role");
    }
  }

  return (
    <div className="flex min-h-screen auth-screen">
      <div className="w-[55%] py-[40px] px-[20px]">
        <div>
          <Link to="/">
            <img src={logo} className="m-auto" alt="logo" />
          </Link>
        </div>

        <div className="flex items-center justify-center min-h-[100%]">
          <div className="text-center w-[400px]">
            <h2 className="text-black text-large font-[700]">Welcome back!</h2>
            <p className="text-gray text-small mb-[10px]">Enter your credentials to access your account</p>
            <span className="text-black text-small">Don't have an account? {" "}
              <Link to="/signup" className="underline text-dark_orange duration-300 hover:text-hover_orange">Sign up</Link>
            </span>

            <div className="flex justify-center mt-[25px] mb-[35px]">
              <div className="bg-[#FEF1F1FF] hover:bg-[#FBD2D0FF] duration-300 w-[80px] mr-[10px] p-[6px] rounded-[18px] cursor-pointer"
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

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
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
                          placeholder="Enter your password"
                          {...field}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="password" component="span" className="error" />
                  </div>

                  <div className="flex justify-between items-center mt-[12px]">
                    <div className="flex items-center">
                      <CheckBoxInput />
                      <span className="text-gray text-small ml-[4px] mt-[2px]">Keep me logged in</span>
                    </div>
                    <Link to="/login" className="text-small text-dark_orange duration-300 hover:text-hover_orange">Forgot Password?</Link>
                  </div>

                  <div className="mt-[30px]">
                    <PrimaryButton type="submit" text="Login" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-center w-[45%] bg-[#FF7029FF] rounded-tl-[350px] overflow-hidden relative design-props">
        <div className="flex items-end justify-center w-[fit-content] h-[fit-content] relative">
          <img src={loginLady} className="w-[360px] z-[1]" alt="" />
          <img src={dottedCircle} className="absolute top-[160px] left-[0] w-[130px] z-[0]" alt="" />
        </div>

        <div className="absolute top-[42%] right-[6%] bg-white p-[15px] rounded-[8px] z-[3] text-center">
          <img src={userAvatar} className="m-auto" alt="" />
          <h6 className="text-[18px] text-black font-[700] mt-[20px] leading-[18px]">Tumber Cook</h6>
          <span className="text-[12px] text-silver">Program Manager</span>
          <div className="mt-[10px]">
            <Twitter className="text-[#2EBAE8FF] mr-[3px] cursor-pointer" style={{ fontSize: "20px" }} />
            <FacebookRounded className="text-[#2E6FE8FF] mr-[3px] cursor-pointer" style={{ fontSize: "20px" }} />
            <LinkedIn className="text-[#2148A5FF] mr-[3px] cursor-pointer" style={{ fontSize: "20px" }} />
            <YouTube className="text-[#E82E2EFF]" style={{ fontSize: "20px" }} />
          </div>
        </div>

        <div className="absolute bottom-[10%] left-[6%] bg-white px-[15px] py-[10px] rounded-[8px] z-[3] flex items-center">
          <img src={talentsIcon} className="w-[44px] h-[44px]" alt="" />
          <div className="mt-[7px] ml-[10px]">
            <h6 className="text-[22px] text-[#323743FF] font-[700] leading-[22px]">1,234,567</h6>
            <span className="text-silver">Talents</span>
          </div>
        </div>

        <img src={ribbonProp} className="absolute bottom-0 z-[2]" alt="" />
      </div>
    </div>
  )
}

export default Login