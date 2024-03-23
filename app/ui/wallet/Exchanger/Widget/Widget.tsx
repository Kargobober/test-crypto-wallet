import { useState } from 'react';
import styles from './Widget.module.css';
import { WithIcon } from '../WithIcon';
import { Currency } from '@/app/lib/constants/currencies';
import BTCsvg from '@/public/currencies/bitcoin-logo-svgrepo-com.svg';

function Widget() {
  const btc = new Currency('BTC', BTCsvg);
  console.log({btc});
  const [cryptocurrencies, setCryptocurrencies] = useState<Array<Currency>>([btc]);
  const [currencies, setCurrencies] = useState<Array<Currency>>([]);

  return (
    <div className={styles.container}>
      <div>
        <ul className='list'>
        {cryptocurrencies.map(item => (
          <li key={item.name}>
            <WithIcon Ico={item.ico} text={item.name} />
          </li>
        ))}
        </ul>

      </div>
    </div>
  )
}

export default Widget;
