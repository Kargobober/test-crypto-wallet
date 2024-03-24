import React, { ChangeEvent, useState } from 'react';
import styles from './SendingPanel.module.css';
import { Button, Input, InputLabel } from '@mui/material';
import { useMetaMask } from '@/app/lib/hooks/useMetaMask';
import { chains } from '@/app/lib/constants';
import { useFormState } from 'react-dom';
import BN from 'bn.js';
import { getDecimalPlaces } from '@/app/lib/utils';

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

  const sendRequest = async (prevState: State, formData: FormData) => {
    const to = formData.get('to');
    // ед. изм. – ETH
    const amount = Number(formData.get('amount'));

    // число знаков после запятой
    const decimalPlaces = getDecimalPlaces(amount);

    // сделали число целым и перевели в hex
    const resintegerHex = (amount * decimalPlaces * 10).toString(16);
    // передали 16ричное число в конструктор bn.js
    const resintegerHexBN = new BN(resintegerHex, 16);

    // число res надо умножить на число ниже, чтобы вернуться к исходному значению
    const multiplierForRestoreHex = (decimalPlaces * 10).toString(16);
    // передали в конструктор
    const multiplierForRestoreHexBN = new BN(multiplierForRestoreHex, 16);

    // res в ед. изм. ETH
    const res = resintegerHexBN.mul(multiplierForRestoreHexBN);
    // 1 ETH = 10**18 Wei, значит, передаем в конструктор число 18 в десятичной СС
    const power = new BN(18, 10); // bn.js сам приводит к одной СС при арифметических операциях??

    // наш amount в wei и 16ричной CC
    const finalRes = res.pow(power);

    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: wallet.accounts[0],
          to: to,
          value: finalRes.toString(),
        }]
      });

      console.log({txHash});
    } catch (err) {
      console.log({errorSending: err});
    }

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
    } else if (amount < (10**(-18))) {
      setAmountErr('To small');
    } else if (amount > 100) { // В JavaScript тип number не может содержать числа больше, чем (2**53 - 1)
      setAmountErr('To big');
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
        disabled={Boolean(!amount || !destination || destinationErr || amountErr)}
        className={styles.button}
      >
        Send
      </Button>
    </form>
  )
}

export default SendingPanel;
