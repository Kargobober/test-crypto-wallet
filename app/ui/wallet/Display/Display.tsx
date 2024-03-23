import { useEffect, useState } from 'react';
import { useMetaMask } from '@/app/lib/hooks/useMetaMask';
import styles from './Display.module.css';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { chains } from '@/app/lib/constants';
import { Exchanger } from '../Exchanger';

export const Display = () => {
  const { wallet, changeCurrentChain } = useMetaMask();

  // hex of current chain
  const [currentChain, setCurrentChain] = useState('');

  const handleChange = async (event: SelectChangeEvent) => {
    try {
      console.log({event});
      await changeCurrentChain(event.target.value);
    } catch (err) {
      console.log({error: err})
    }
  };

  useEffect(() => {
    setCurrentChain(wallet.chainId);
  }, [wallet.chainId]);

  return (
    <section className={styles.display}>
      {wallet.accounts.length > 0 &&
        <>
          <div className={styles.walletAcc}>Wallet Accounts: {wallet.accounts[0]}</div>

          <FormControl sx={{ marginY: 2 }}>
            <InputLabel id="chain-select-label">Current chain</InputLabel>
            <Select
              labelId="chain-select-label"
              id="chain-select"
              value={currentChain}
              label="Current chain"
              onChange={handleChange}
            >
              {chains.map(chain => <MenuItem key={chain.hex} value={chain.hex}>{chain.fullName}</MenuItem>)}
            </Select>
          </FormControl>

          <div>Wallet Balance: {wallet.balance}</div>

          <Exchanger />
        </>
      }
    </section>
  )
}
