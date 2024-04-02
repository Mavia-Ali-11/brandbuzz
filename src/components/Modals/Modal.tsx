import React, { ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { PrimaryButton } from '../';

const style = {
    p: 4,
    top: '50%',
    left: '50%',
    boxShadow: 24,
    borderRadius: 2,
    outline: "none",
    textAlign: "center",
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)',
    position: 'absolute' as 'absolute',
    width: window.innerWidth > 767 ? 600 : "92%",
};

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    description: string;
    button?: boolean;
    buttonText: string;
    icon?: ReactNode;
}

const PopupModal: React.FC<ModalProps> = ({
    open,
    handleClose,
    title,
    description,
    button = true,
    buttonText,
    icon
}) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {icon && <div className="w-full flex justify-center mb-[20px]">{icon}</div>}
                        <h2 className="text-medium text-black font-[700]">{title}</h2>
                        <p className="text-normal text-black my-[40px]">{description}</p>
                        {button &&
                            <PrimaryButton
                                type="button"
                                text={buttonText}
                                className="max-w-[120px]"
                                onClick={handleClose}
                            />
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default PopupModal;