import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, PrimaryButton } from '../../components';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import logo from '../../assets/images/logo.png'
import car from '../../assets/images/car.png'

const RoleSelect = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const goToCreateBrand = () => navigate("/create-brand");

    const activeTabClasses = "rounded-[5px] bg-dark_orange w-[150px] pt-[12px] pb-[10px] text-center text-small text-white font-[500] mx-[3px] cursor-pointer"
    const inActiveTabClasses = "rounded-[5px] w-[150px] pt-[12px] pb-[10px] text-center text-small text-dark_orange font-[500] mx-[3px] cursor-pointer duration-300 hover:bg-faded_orange"

    return (
        <>
            <div className="min-h-[100vh] py-[50px] overflow-hidden relative roles_main">
                <div className="max-w-fit m-auto">
                    <Link to="/">
                        <img src={logo} className="mr-[10px]" alt="logo" />
                    </Link>
                </div>
                <div className="max-w-fit m-auto roles">
                    <div className="bg-white mx-[20px] rounded-[8px] p-[55px] mt-[40px]">
                        <div className='flex flex-wrap justify-center '>
                            <div className='text-center'>
                                <img src={car} className='w-[300px] h-[205px]' alt="" />
                                <h2 className="text-medium font-[700] mt-[40px]">Are You a Brand, <br /> or an Agency?</h2>
                            </div>
                            <div className="flex items-center pl-[50px] roles_toggle">
                                <div className='w-full'>
                                    <p className='font-[600] my-[15px] ml-[3px]'>You are:</p>
                                    <div className="rounded-[5px] p-[3px] flex items-center max-w-fit">
                                        <div
                                            className={activeTab === 0 ? activeTabClasses : inActiveTabClasses}
                                            onClick={() => setActiveTab(0)}
                                        >
                                            Brand
                                        </div>
                                        <div
                                            className={`${inActiveTabClasses} cursor-not-allowed`}
                                            // className={activeTab === 1 ? activeTabClasses : inActiveTabClasses}
                                            // onClick={() => setActiveTab(1)}
                                            onClick={handleModalOpen}
                                        >
                                            Agency
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end roles_next">
                            <PrimaryButton
                                text="Next"
                                icon={<EastOutlinedIcon className="!text-[16px] ml-[4px]" />}
                                className="text-[14px] max-w-[115px] mt-[30px]"
                                onClick={goToCreateBrand}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={modalOpen}
                handleClose={handleModalClose}
                title="Coming Soon"
                description="We're currently working hard to bring this feature to you soon"
                buttonText="Ok"
            />
        </>
    )
}

export default RoleSelect