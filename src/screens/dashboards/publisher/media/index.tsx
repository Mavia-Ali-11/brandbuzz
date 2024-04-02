import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Active from "./Active";

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
        <Box sx={{ py: 5 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Missions = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <>
      <div className='!min-h-[110px] !pl-0 flex items-center'>
        <h2 className='text-black text-large font-[700]'>Media</h2>
      </div>

      <div className="missions-tab">
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab value={0} label="Active (3)" className='!normal-case !text-[16px]'
          />
          <Tab value={1} label="Awaiting Approval (0)" className='!normal-case !text-[16px]' />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Active />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Active />
      </TabPanel>
      </div>
    </>
  )
}

export default Missions;