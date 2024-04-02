import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { InputAdornment } from "@mui/material";
import { Link } from 'react-router-dom';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import { PrimaryButton } from '..';
import { FacebookRounded, Twitter, LinkedIn, YouTube, EmailOutlined } from '@mui/icons-material';
import logo from '../../assets/images/logo.png'

const Footer = () => {
  return (
    <footer className="bg-[#FAFAFBFF] pt-[60px] px-[60px] pb-[20px]">
        <Grid container>
          <Grid xs={12} sm={4} lg={3} className="mb-[35px]">
            <img src={logo} alt="logo" />
          </Grid>
          <Grid xs={12} sm={4} lg={2} className="mb-[35px]">
            <h6 className="text-[20px] text-black font-[700] mb-[16px]">
              Product
            </h6>
            <Link to="/" className="block text-gray mt-[10px] duration-300 hover:text-hover_orange max-w-fit">
              Features
            </Link>
            <Link to="/" className="block text-gray mt-[10px] duration-300 hover:text-hover_orange max-w-fit">
              Pricing
            </Link>
          </Grid>
          <Grid xs={12} sm={4} lg={2} className="mb-[35px]">
            <h6 className="text-[20px] text-black font-[700] mb-[16px]">
              Resources
            </h6>
            <Link to="/" className="block text-gray mt-[10px] duration-300 hover:text-hover_orange max-w-fit">
              Blog
            </Link>
            <Link to="/" className="block text-gray mt-[10px] duration-300 hover:text-hover_orange max-w-fit">
              User guides
            </Link>
            <Link to="/" className="block text-gray mt-[10px] duration-300 hover:text-hover_orange max-w-fit">
              Webinars
            </Link>
          </Grid>
          <Grid xs={12} sm={4} lg={2} className="mb-[35px]">
            <h6 className="text-[20px] text-black font-[700] mb-[16px]">
              Company
            </h6>
            <Link to="/" className="block text-gray mt-[10px] duration-300 hover:text-hover_orange max-w-fit">
              About
            </Link>
            <Link to="/" className="block text-gray mt-[10px] duration-300 hover:text-hover_orange max-w-fit">
              Join us
            </Link>
          </Grid>
          <Grid xs={12} sm={8} lg={3}>
            <h6 className="text-[18px] text-dark_orange font-[700]">
              Subscribe to our newsletter
            </h6>
            <p className="text-silver text-[12px] mb-[15px]">
              For product announcements and exculisve insights
            </p>
            <div className="flex items-center">
              <TextField
                type="email"
                variant="standard"
                placeholder="Input your email"
                className="bg-light !py-0 !px-[12px] rounded-lg rounded-e-none flex items-center newsletter-inp"
                InputProps={{
                  startAdornment:
                    <InputAdornment position="start">
                      <EmailOutlined className="!text-[18px]" />
                    </InputAdornment>,
                }}
              />
              <PrimaryButton
                text="Subscribe"
                className="h-[36px] py-0 px-[20px] max-w-fit rounded-s-none text-small"
              />
            </div>
          </Grid>
        </Grid>

        <div className="mt-[40px] footer-bottom">
          <Grid container>
            <Grid xs={12} sm={3} lg={4} className="flex items-end justify-start">
              {/* <FormControl size="small">
                <Select
                  value="eng"
                  className="w-[110px] !text-gray lang-select"
                  style={{ background: "#F3F4F6FF" }}
                >
                  <MenuItem value="eng">English</MenuItem>
                  <MenuItem value="mal">Malay</MenuItem>
                  <MenuItem value="ur">Urdu</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>
            <Grid xs={12} sm={6} lg={4} className="flex items-end justify-center">
              <span className="text-silver text-small">
                &copy; 2023 Brandzbuzz
              </span>
              <span className="text-silver font-[700] mx-[10px] scale-125 translate-y-[-4px]">.</span>
              <Link to="/" className="text-silver text-small duration-300 hover:text-hover_orange">
                Privacy
              </Link>
              <span className="text-silver font-[700] mx-[10px] scale-125 translate-y-[-4px]">.</span>
              <Link to="/" className="text-silver text-small duration-300 hover:text-hover_orange">
                Terms
              </Link>
            </Grid>
            <Grid xs={12} sm={3} lg={4} className="flex items-end justify-end">
              <Twitter className="text-[#2EBAE8FF] mr-[8px] cursor-pointer" style={{ fontSize: "22px" }} />
              <FacebookRounded className="text-[#2E6FE8FF] mr-[8px] cursor-pointer" style={{ fontSize: "22px" }} />
              <LinkedIn className="text-[#2148A5FF] mr-[8px] cursor-pointer" style={{ fontSize: "22px" }} />
              <YouTube className="text-[#E82E2EFF]" style={{ fontSize: "22px" }} />
            </Grid>
          </Grid>
        </div>
      </footer>
  )
}

export default Footer;