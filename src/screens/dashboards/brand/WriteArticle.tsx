import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Modal, PrimaryButton } from '../../../components';
import logo from '../../../assets/images/logo.png'
import AIWriterIcon from '../../../assets/images/ai-writer-icon.png'
import 'react-quill/dist/quill.snow.css';

const WriteArticle = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleValueChange = (e: any) => {
        setValue(e);
        setShowError(false);
    }

    const goToCongrats = () => value ? navigate("/brand/campaign-congrats") : setShowError(true);

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'], // 'image', 'video'
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'link'
        // 'video', 'image',
    ];

    return (
        <>
            <div className="min-h-[100vh] py-[50px] overflow-hidden relative roles_main welcome_main">
                <div className="max-w-fit m-auto">
                    <img src={logo} className="mr-[10px]" alt="logo" />
                </div>
                <div className="max-w-[70%] m-auto roles verify-main">
                    <div className="bg-white mx-[20px] rounded-[8px] pt-[50px] pb-[40px] px-[40px] mt-[40px] details-form">
                        <h2 className="text-medium font-[700] text-center">
                            Write Your Article
                        </h2>
                        <p className='text-small text-black text-center my-[15px]'>
                            Input your article below
                        </p>
                        <div className="mt-[25px]">
                            <PrimaryButton
                                type="button"
                                text="AI Writer"
                                className="mb-[15px] max-w-[130px]"
                                icon={<PsychologyAltOutlinedIcon className="mr-[4px] translate-y-[-2px]" />}
                                iconPosition="left"
                                onClick={handleModalOpen}
                            />
                            <HelpOutlinedIcon
                                className="ml-[15px] text-dark_orange cursor-pointer duration-300 hover:text-hover_orange"
                                onClick={handleModalOpen}
                            />

                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={value}
                                onChange={handleValueChange}
                                placeholder="Type here..."
                            />
                            {showError && <span className="error">Required</span>}

                            <div className="w-full text-right">
                                <PrimaryButton
                                    type="submit"
                                    text="Done"
                                    icon={<EastOutlinedIcon className="!text-[16px] ml-[4px]" />}
                                    className="text-[14px] max-w-[90px] mt-[15px]"
                                    onClick={goToCongrats}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Modal
                open={modalOpen}
                handleClose={handleModalClose}
                title="AI Helper"
                description="Let our Al, trained on thousands of articles, help you write your
                article, based on the brief you provided, and the publishers you selected."
                buttonText="Ok"
                icon={<img src={AIWriterIcon} alt="" />}
            />
        </>
    )
}

export default WriteArticle;