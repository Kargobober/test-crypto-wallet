import { useState, SyntheticEvent } from 'react';
import styles from './Exchanger.module.css';
import { Box, Tab, Tabs } from '@mui/material';
import { CustomTabPanel } from '../CutomTabPanel';
import { MainContent } from './MainContent';
import { SendingPanel } from '../SendingPanel';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Exchanger() {
  const [valueTab, setValueTab] = useState(0);

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <Box className={styles.exchangerWrapper}>
      <Tabs
        value={valueTab}
        onChange={handleChangeTab}
        aria-label="tabs for exchange modes"
      >
        <Tab label="Fast buy" {...a11yProps(0)} className={styles.tab} />
        <Tab label="Fast Exchange" {...a11yProps(1)} className={styles.tab} />
        <Tab label="Fast Send" {...a11yProps(2)} className={styles.tab} />
      </Tabs>

      <CustomTabPanel value={valueTab} index={0}>
        <MainContent mode={valueTab} />
      </CustomTabPanel>
      <CustomTabPanel value={valueTab} index={1}>
        <MainContent mode={valueTab} />
      </CustomTabPanel>
      <CustomTabPanel value={valueTab} index={2}>
        <SendingPanel />
      </CustomTabPanel>
    </Box>
  )
}

export default Exchanger;
