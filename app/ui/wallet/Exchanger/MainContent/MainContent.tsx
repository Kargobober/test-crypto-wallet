import { FC, useState } from 'react';
import styles from './MainContent.module.css';
import { Button, Link } from '@mui/material';
import { Widget } from '../Widget';

type TProps = {
  mode: number;
}

const MainContent: FC<TProps> = ({ mode }) => {
  const [leftCurrency, setLeftCurrency] = useState<string>('BTC');
  const [currencyFactor, setCurrencyFactor] = useState<number>(2542.06);
  const [rightCurrency, setRightCurrency] = useState<string>('USD');

  const [commission, setCommission] = useState<number>(10);

  return (
    <div className={styles.container}>
      <Widget />
      <div className={`${styles.additionalDataContainer} text_size_small`}>
        <p>1.00 {leftCurrency} = {currencyFactor} {rightCurrency}</p>
        <div className={styles.sourceContainer}>
          <p className={styles.sourceText}>Source: </p>
          <Link
            href='https://www.cryptocompare.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            www.cryptocompare.com
          </Link>
        </div>
        <p>Commission: <span className='text_bold'>{commission}%</span></p>
      </div>
      <Button
        variant='contained'
        className={styles.buttonSubmit}
      >
        {mode === 0 ? 'Buy' : 'Exchange'}
      </Button>
    </div>
  )
}

export default MainContent;
