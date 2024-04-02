import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
import welcome from '../../../assets/images/welcome-to-buzz.png'

const CampaignCongrats = () => {
    return (
        <div className="min-h-[100vh] py-[50px] overflow-hidden relative roles_main welcome_main">
            <div className="max-w-fit m-auto">
                <img src={logo} className="mr-[10px]" alt="logo" />
            </div>
            <div className="max-w-[70%] m-auto roles verify-main">
                <div className="bg-white mx-[20px] rounded-[8px] p-[55px] mt-[40px] text-center details-form">
                    <h2 className="text-medium font-[700] mb-[30px]">
                        Congrats! Your campaign is on the way
                    </h2>
                    <p className='text-small text-black mb-[30px]'>
                        Now, sit back & relax. We'll notify you when a publisher accepts your <br />
                        campaign, and you can start collecting those clicks.
                    </p>
                    <img src={welcome} className='m-auto' alt="" />

                    <Link
                        to="/brand"
                        className="
                         mt-12
                         w-[200px] 
                         inline-block 
                         bg-dark_orange 
                         text-white 
                         py-[10px] 
                         rounded-[6px] 
                         duration-300 
                         hover:bg-hover_orange"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CampaignCongrats;