import { FC, memo, useState } from 'react';
import styles from './MainContent.module.css';
import { Button, Link } from '@mui/material';
import { Widget } from '../Widget';

type TProps = {
  mode: number;
}

const MainContent: FC<TProps> = ({ mode }) => {
  return (
    <div className={styles.container}>
      <Widget mode={mode} />
      <Button
        variant='contained'
        className={styles.buttonSubmit}
      >
        {mode === 0 ? 'Buy' : 'Exchange'}
      </Button>
    </div>
  )
}

export default memo(MainContent);
