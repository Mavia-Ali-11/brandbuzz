import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import FaqsGirl from "../assets/images/faqs-girl.png";
import { PrimaryButton } from '../components';
import { contactEmail } from '../utils/common';

const Faqs = () => {
    const [expanded, setExpanded] = useState<string | false>("panel1");

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <section className="faq-banner">
                <div className="flex items-center h-full bg-[#0000004d]">
                    <h1 className="text-white text-xlarge text-center w-full font-[700]">
                        Frequently Asked Questions
                    </h1>
                </div>
            </section>

            <section className="p-[90px] px-[60px] faqs-wrapper">
                <h2 className="text-black text-xxlarge text-center font-[700]">
                    Frequently asked questions
                </h2>
                <p className="text-silver mt-[8px] text-center">
                    Unlocking answers of most common queries
                </p>

                <div className="mt-12 faq-collapse">
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlinedIcon />}
                            className="faq-header"
                        >
                            <h6 className="text-black text-[18px] font-[600] pr-[35px] leading-[24px]">
                                How much does it cost for Brands?
                            </h6>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                            <p className="text-gray">
                                Nisi do sunt veniam esse quis ex labore Lorem et. Excepteur labore minim ea ea officia labore duis duis Lorem est tempor labore sint sint. Ipsum nostrud velit et qu
                            </p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlinedIcon />}
                            className="faq-header"
                        >
                            <h6 className="text-black text-[18px] font-[600] pr-[35px] leading-[24px]">
                                Can I choose which publishers write my story?
                            </h6>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                            <p className="text-gray">
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                laoreet.
                            </p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlinedIcon />}
                            className="faq-header"
                        >
                            <h6 className="text-black text-[18px] font-[600] pr-[35px] leading-[24px]">
                                CEu ex officia nostrud excepteur qui?
                            </h6>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                            <p className="text-gray">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlinedIcon />}
                            className="faq-header"
                        >
                            <h6 className="text-black text-[18px] font-[600] pr-[35px] leading-[24px]">
                                Sint occaecat dolor ea officia dolore veniam minim aliquip?
                            </h6>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                            <p className="text-gray">
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                laoreet.
                            </p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlinedIcon />}
                            className="faq-header"
                        >
                            <h6 className="text-black text-[18px] font-[600] pr-[35px] leading-[24px]">
                                Velit nulla ex nostrud consequat incididunt sint qui sint?
                            </h6>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                            <p className="text-gray">
                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                laoreet.
                            </p>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </section>

            <section className="px-[60px] pb-[60px] faq-need-help">
                <Grid container>
                    <Grid xs={12} sm={12} md={6} className="flex items-center bg-[#740C00FF] rounded-s-lg content-wrap">
                        <div className="p-[60px]">
                            <h4 className="text-xlarge text-white font-[700]">
                                Still need help?
                            </h4>
                            <p className="text-[#DEE1E6FF]">
                                Drop us an email, an we'll get back as soon as we can, typically no longer than a week.
                            </p>
                            <div className="mt-10">
                                <PrimaryButton
                                    type="button"
                                    text="Contact us"
                                    onClick={contactEmail}
                                    className="max-w-[120px] bg-white !text-black border-white hover:!text-white"
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={6}>
                        <img src={FaqsGirl} className="w-full h-full" alt="need help" />
                    </Grid>
                </Grid>
            </section>

        </>
    )
}

export default Faqs;