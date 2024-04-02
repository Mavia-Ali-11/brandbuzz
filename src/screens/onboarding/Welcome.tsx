import { useEffect } from 'react';
import logo from '../../assets/images/logo.png'
import welcome from '../../assets/images/welcome-to-buzz.png'
import { dispatchStorage } from '../../utils/common';
import { Link, useLocation } from 'react-router-dom';

const WelcomeToBuzz = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.role) {
            setTimeout(() => {
                dispatchStorage("userRole", location.state?.role, "local");
            }, 2000);
        }
    }, [location.state?.role]);

    return (
        <div className="min-h-[100vh] py-[50px] overflow-hidden relative roles_main welcome_main">
            <div className="max-w-fit m-auto">
                <Link to="/">
                    <img src={logo} className="mr-[10px]" alt="logo" />
                </Link>
            </div>
            <div className="max-w-[70%] m-auto roles verify-main">
                <div className="bg-white mx-[20px] rounded-[8px] p-[55px] mt-[40px] details-form">
                    <h2 className="text-medium font-[700] mb-[30px] text-center">
                        Welcome to Buzzing
                    </h2>
                    <p className='text-small text-black text-center mb-[30px]'>
                        We've sent you an email with next steps
                    </p>
                    <img src={welcome} className='m-auto' alt="" />
                </div>
            </div>
        </div>
    )
}

export default WelcomeToBuzz