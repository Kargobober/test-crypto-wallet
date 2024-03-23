import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import styles from './SendingPanel.module.css';
import { Button, Input, InputLabel } from '@mui/material';
import { useMetaMask } from '@/app/lib/hooks/useMetaMask';
import { chains } from '@/app/lib/constants';
import { useFormState } from 'react-dom';

export type State = {
  success: boolean;
};

function SendingPanel() {
  const { wallet } = useMetaMask();

  const [destination, setDestination] = useState('');
  const [destinationErr, setDestinationErr] = useState('');

  const [amount, setAmount] = useState<number>(0);
  const [amountErr, setAmountErr] = useState('');

  const chainFullName = chains.find(chain => chain.hex === wallet.chainId)?.fullName;

  const sendRequest = (prevState: State, formData: FormData) => {
    const to = formData.get('to');
    const amount = Number(formData.get('amount'));

    return {
      success: true,
    };
  };

  const initialState = { success: false };
  const [state, dispatch] = useFormState(sendRequest, initialState);

  const handleChangeDestination = (evt: ChangeEvent<HTMLInputElement>) => {
    const destination = evt.target.value;
    setDestination(destination);

    if (!destination) {
      setDestinationErr('Empty field');
    } else {
      setDestinationErr('');
    }
  }

  const handleChangeAmount = (evt: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(evt.target.value);
    setAmount(amount);

    if (amount === 0) {
      setAmountErr('Nullish amount');
    } else if (amount > Number(wallet.balance)) {
      setAmountErr('Amount exceeds your balance');
    } else {
      setAmountErr('');
    }
  }

  if (!chainFullName?.includes('Testnet')) return (<p>Choose testnet</p>);

  return (
    <form action={dispatch} className={styles.form}>
      <InputLabel htmlFor='leftInput' className={styles.leftLabel}>
        {"Recipient's wallet number"}
      </InputLabel>
      <Input
        type='text'
        name='to'
        error={Boolean(destinationErr)}
        disableUnderline
        value={destination}
        onChange={handleChangeDestination}
        className={styles.input}
        placeholder='0x157bca. . .'
        required
      />
      <p className={styles.error}>{destinationErr}</p>

      <p className={styles.chain}>Current chain: {chainFullName}</p>
      <InputLabel htmlFor='leftInput' className={styles.leftLabel}>
        Amount
      </InputLabel>
      <Input
        type='number'
        name='amount'
        error={Boolean(amountErr)}
        value={amount}
        onChange={handleChangeAmount}
        disableUnderline
        className={styles.input}
        required
      />
      <p className={styles.error}>{amountErr}</p>

      <Button
        type='submit'
        variant='contained'
        disabled={!Boolean(destination && amount)}
        className={styles.button}
      >
        Send
      </Button>
    </form>
  )
}

export default SendingPanel;
