import React, { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import NewProposals from "./NewProposals";
import InProgress from "./InProgress";
import Completed from "./Completed";
import { futureEndDateorCPA, getAuthSession, pastEndDate } from "../../../../utils/common";
import { getInvitations } from "../../../../services/publisherServices";
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

type Invites = {
  campaignId: string;
  name: string;
  paymentModel: string;
  budget: number;
  description: string;
  startingDate: string;
  endingDate: string;
  status: string,
};

const Missions = () => {
  const [value, setValue] = useState(0);
  const [pendingInvites, setPendingInvites] = useState<Invites[]>([]);
  const [acceptedInvites, setAcceptedInvites] = useState<Invites[]>([]);
  const [completedInvites, setCompletedInvites] = useState<Invites[]>([]);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    const user = await getAuthSession();

    try {
      const data = await getInvitations(user.email);
      let pending: any = [];
      let accepted: any = [];
      let completed: any = [];

      data.forEach((invite: Invites) => {
        const endDate = invite.endingDate;
        const type = invite.paymentModel;

        if (invite.status === "PENDING" && (futureEndDateorCPA(endDate, type))) {
          pending.push(invite);
        } else if (invite.status === "ACCEPTED" && (futureEndDateorCPA(endDate, type))) {
          accepted.push(invite);
        } else if (invite.status === "ACCEPTED" && pastEndDate(endDate)) {
          completed.push(invite);
        }
      });

      setPendingInvites(pending);
      setAcceptedInvites(accepted);
      setCompletedInvites(completed);
    } catch (e) {
      console.error(e);
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <>
      <div className='!min-h-[110px] !pl-0 flex items-center'>
        <h2 className='text-black text-large font-[700]'>Missions</h2>
      </div>

      <div className="missions-tab">
        <Box>
          <Tabs value={value} onChange={handleChange}>
            <Tab value={0} label={`New Proposals (${pendingInvites.length})`} className='!normal-case !text-[16px]'
            />
            <Tab value={1} label={`In Progress (${acceptedInvites.length})`} className='!normal-case !text-[16px]' />
            <Tab value={2} label={`Completed (${completedInvites.length})`} className='!normal-case !text-[16px]' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <NewProposals invites={pendingInvites} initializePage={initializePage} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InProgress invites={acceptedInvites} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Completed invites={completedInvites} />
        </TabPanel>
      </div>
    </>
  )
}

export default Missions;