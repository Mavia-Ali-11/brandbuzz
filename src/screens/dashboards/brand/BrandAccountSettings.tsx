import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UserIcon from "../../../assets/images/user-icon.png"
import PaymentIcon from "../../../assets/images/payment-icon.png"
// import SecurityIcon from "../../../assets/images/security-icon.png"
// import PreferencesIcon from "../../../assets/images/preferences-icon.png"
import EmailIcon from "../../../assets/images/email-icon.png"
// import ProfileImage from "../../../assets/images/profile-dp.png"
// import EditPencil from "../../../assets/images/edit-pencil.png"
import dayjs from 'dayjs';
import { getBrandProfile } from '../../../services/brandServices';
import { deleteStorage, getAuthSession } from '../../../utils/common';
import { PrimaryButton } from '../../../components';
import { logoutUser } from '../../../services/authServices';
import Notify from '../../../helpers/NotificationHelper';
import { useNavigate } from 'react-router-dom';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

const AccountSettings = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [userDetails, setUserDetails] = useState<{ [key: string]: { isEditing: boolean, value: string }; }>
        ({
            fullName: { isEditing: false, value: "" },
            email: { isEditing: false, value: "" },
            gender: { isEditing: false, value: "" },
            birthDate: { isEditing: false, value: "" },
            phone: { isEditing: false, value: "" },
            emergencyContact: { isEditing: false, value: "" },
        });

    const birthDate = userDetails.birthDate;

    useEffect(() => {
        initializePage();
    }, []);

    const initializePage = async () => {
        const user = await getAuthSession();

        try {
            const profile = await getBrandProfile(user.email);
            setUserDetails({
                fullName: { isEditing: false, value: profile.name },
                email: { isEditing: false, value: user.email },
                gender: { isEditing: false, value: "" },
                birthDate: { isEditing: false, value: "" },
                phone: { isEditing: false, value: "" },
                emergencyContact: { isEditing: false, value: "" }
            });
        } catch (e) {
            console.error(e);
        }
    }

    const handleEditingFields = async (fieldName: string) => {
        const userDetailsCopy = { ...userDetails };
        const editState = userDetailsCopy[fieldName].isEditing;
        userDetailsCopy[fieldName].isEditing = !editState;
        setUserDetails(userDetailsCopy);

        // if (editState) {
        //     try {
        //         const result = await updatePublisherAccount({
        //             "fullName": userDetails.fullName.value,
        //             "email": userDetails.email.value,
        //             "gender": userDetails.gender.value,
        //             "birthDate": birthDate.value,
        //             "phone": userDetails.phone.value,
        //             "emergencyContact": userDetails.emergencyContact.value,
        //         });
        //         Notify.success(result.message);
        //     } catch (e: any) {
        //         Notify.error(e.response.data.message);
        //     }
        // }
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userDetailsCopy = { ...userDetails };
        userDetailsCopy[e.target.name].value = e.target.value;
        setUserDetails(userDetailsCopy)
    }

    const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

    const logout = async () => {
        try {
            await logoutUser();
            deleteStorage("userRole", "local");
            Notify.success("Logout successful");
            navigate("/login");
        } catch (e: any) {
            Notify.error("Error while logging out")
        }
    }

    return (
        <>
            <div className='!min-h-[110px] !pl-0 flex items-center'>
                <h2 className='text-black text-large font-[700]'>Account Settings</h2>
            </div>

            <div className='flex flex-wrap justify-between mt-[10px] user-tabs'>
                <div className='w-[28%] border-[1px] border-light rounded-[4px] h-fit'>
                    <Box>
                        <Tabs
                            value={value}
                            onChange={handleTabsChange}
                            orientation='vertical'
                        >
                            <Tab
                                value={0}
                                label="Personal info"
                                icon={<img src={UserIcon} className='!mr-[12px]' alt="icon" />}
                                iconPosition="start"
                                className={`!justify-start !normal-case !text-[16px] ${value === 0 && " !text-dark_orange"}`}
                            />
                            <Tab
                                value={1}
                                label="Payment Info"
                                icon={<img src={PaymentIcon} className='!mr-[12px]' alt="icon" />}
                                iconPosition="start"
                                className={`!justify-start !normal-case !text-[16px] ${value === 1 && " !text-dark_orange"}`}
                            />
                            <Tab
                                value={2}
                                label="Contact us"
                                icon={<img src={EmailIcon} className='!mr-[12px]' alt="icon" />}
                                iconPosition="start"
                                className={`!justify-start !normal-case !text-[16px] ${value === 2 && " !text-dark_orange"}`}
                            />
                        </Tabs>
                    </Box>
                </div>
                <div className='w-[70%]'>
                    <TabPanel value={value} index={0}>
                        <>
                            {/* <div className='relative max-w-fit'>
                                <img src={ProfileImage} alt="profile" />
                                <img src={EditPencil} className='absolute bottom-0 right-[-2px]' alt="edit" />
                            </div> */}
                            <div className='flex justify-between border-b-[1px] border-[#DEE1E6FF] pb-[13px]'>
                                <div>
                                    <h6 className='text-small text-black font-[700]'>Full name</h6>
                                    <TextField
                                        name="fullName"
                                        variant="standard"
                                        className="account_field"
                                        placeholder="John Doe"
                                        value={userDetails.fullName.value}
                                        onChange={handleFieldChange}
                                        disabled={!userDetails.fullName.isEditing}
                                    />
                                </div>
                                <div>
                                    <span
                                        className='text-black text-small underline cursor-pointer duration-300 hover:text-dark_orange'
                                        onClick={() => handleEditingFields("fullName")}>
                                        {userDetails.fullName.isEditing ? "Save" : "Edit"}
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between border-b-[1px] border-[#DEE1E6FF] pt-[20px] pb-[13px]'>
                                <div>
                                    <h6 className='text-small text-black font-[700]'>Email</h6>
                                    <TextField
                                        variant="standard"
                                        className="account_field"
                                        placeholder="johndoe@gmail.com"
                                        value={userDetails.email.value}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between border-b-[1px] border-[#DEE1E6FF] pt-[20px] pb-[13px]'>
                                <div>
                                    <h6 className='text-small text-black font-[700]'>Gender</h6>
                                    <TextField
                                        name="gender"
                                        variant="standard"
                                        className="account_field"
                                        placeholder="Male / Female/ Other"
                                        value={userDetails.gender.value}
                                        onChange={handleFieldChange}
                                        disabled={!userDetails.gender.isEditing}
                                    />
                                </div>
                                <div>
                                    <span
                                        className='text-black text-small underline cursor-pointer duration-300 hover:text-dark_orange'
                                        onClick={() => handleEditingFields("gender")}>
                                        {userDetails.gender.isEditing ? "Save" : "Edit"}
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between border-b-[1px] border-[#DEE1E6FF] pt-[20px] pb-[15px]'>
                                <div>
                                    <h6 className='text-small text-black font-[700]'>Date of birth</h6>
                                    {
                                        birthDate.isEditing ?
                                            <input
                                                type="date"
                                                name="birthDate"
                                                className='text-small outline-none'
                                                value={dayjs(birthDate.value).format('YYYY-MM-DD')}
                                                onChange={handleFieldChange}
                                            />
                                            :
                                            <p className={`text-small text-black mt-[3px] ${!birthDate.value ? "opacity-[0.45]" : ""}`}>
                                                {
                                                    birthDate.value ?
                                                        dayjs(birthDate.value).format('MMMM D, YYYY')
                                                        : "MMMM D, YYYY"
                                                }
                                            </p>
                                    }
                                </div>
                                <div>
                                    <span
                                        className='text-black text-small underline cursor-pointer duration-300 hover:text-dark_orange'
                                        onClick={() => handleEditingFields("birthDate")}>
                                        {userDetails.birthDate.isEditing ? "Save" : "Edit"}
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between border-b-[1px] border-[#DEE1E6FF] pt-[20px] pb-[15px]'>
                                <div>
                                    <h6 className='text-small text-black font-[700]'>Phone number</h6>
                                    <TextField
                                        name="phone"
                                        variant="standard"
                                        className="account_field"
                                        placeholder="(+1) 012 345 6789"
                                        value={userDetails.phone.value}
                                        onChange={handleFieldChange}
                                        disabled={!userDetails.phone.isEditing}
                                    />
                                </div>
                                <div>
                                    <span
                                        className='text-black text-small underline cursor-pointer duration-300 hover:text-dark_orange'
                                        onClick={() => handleEditingFields("phone")}>
                                        {userDetails.phone.isEditing ? "Save" : "Edit"}
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between pt-[20px] pb-[15px]'>
                                <div>
                                    <h6 className='text-small text-black font-[700]'>Emergency contact</h6>
                                    <TextField
                                        name="emergencyContact"
                                        variant="standard"
                                        className="account_field"
                                        placeholder="Not provided"
                                        value={userDetails.emergencyContact.value}
                                        onChange={handleFieldChange}
                                        disabled={!userDetails.emergencyContact.isEditing}
                                    />
                                </div>
                                <div>
                                    <span
                                        className='text-black text-small underline cursor-pointer duration-300 hover:text-dark_orange'
                                        onClick={() => handleEditingFields("emergencyContact")}>
                                        {userDetails.emergencyContact.isEditing ? "Save" : userDetails.emergencyContact.value ? "Edit" : "Add"}
                                    </span>
                                </div>
                            </div>
                        </>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <h5 className='text-silver text-[20px]'>Coming soon...</h5>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <h5 className='text-silver text-[20px]'>Coming soon...</h5>
                    </TabPanel>
                </div>
            </div>

            <PrimaryButton
                type="button"
                text="Logout"
                className="float-right max-w-[150px]"
                onClick={logout}
            />
        </>
    )
}

export default AccountSettings;