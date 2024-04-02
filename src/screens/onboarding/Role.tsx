import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import logo from '../../assets/images/logo.png'
import car from '../../assets/images/car.png'

const Role = () => {
    const navigate = useNavigate();

    const goToRoleSelect = () => navigate("/select-role");
    const goToVerifyCompany = () => navigate("/verify-company");

    return (
        <div className="min-h-[100vh] py-[50px] overflow-hidden relative roles_main">
            <div className="max-w-fit m-auto">
                <Link to="/">
                    <img src={logo} className="mr-[10px]" alt="" />
                </Link>
            </div>
            <div className="mt-[35px]">
                <h2 className="text-large font-[700] text-center">Select Your Role</h2>
            </div>
            <div className="flex flex-wrap justify-center roles">
                <div className="bg-white mx-[20px] rounded-[8px] p-[55px] text-center mt-[30px]">
                    <img src={car} className='w-full h-[205px]' alt="" />
                    <h2 className="text-medium font-[700] mt-[40px]">Brand & Agencies</h2>
                    <p className='text-black text-small my-[30px]'>Get Editorial Coverage!</p>
                    <PrimaryButton
                        text="Next"
                        icon={<EastOutlinedIcon className="!text-[16px] ml-[4px]" />}
                        className="text-[14px] max-w-[115px]"
                        onClick={goToRoleSelect}
                    />
                </div>
                <div className="bg-white mx-[20px] rounded-[8px] p-[55px] text-center mt-[30px]">
                    <img src={car} className='w-full h-[205px]' alt="" />
                    <h2 className="text-medium font-[700] mt-[40px]">Publishers</h2>
                    <p className='text-black text-small my-[30px]'>Get money!</p>
                    <PrimaryButton
                        text="Next"
                        icon={<EastOutlinedIcon className="!text-[16px] ml-[4px]" />}
                        className="text-[14px] max-w-[115px]"
                        onClick={goToVerifyCompany}
                    />
                </div>
            </div>
        </div>
    )
}

export default Role