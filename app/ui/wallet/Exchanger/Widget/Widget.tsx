import { SyntheticEvent, useState, FC, useCallback, useEffect } from 'react';
import styles from './Widget.module.css';
import { WithIcon } from '../WithIcon';
import { Currency, ETH, USD, availableCryptocurrencues, availableCurrencues } from '@/app/lib/constants/currencies';
import { Button, Input, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SwitcherSVG from '@/public/switch-horizontal-svgrepo-com.svg';

type TProps = {
  mode: number;
}

const Widget:FC<TProps> = ({ mode }) => {
  // стейт для хранения доступных счётов пользователя. На данном этапе ХАРДКОД
  const [cryptocurrencies, setCryptocurrencies] = useState<Array<Currency>>(availableCryptocurrencues);
  const [currencies, setCurrencies] = useState<Array<Currency>>(availableCurrencues);

  const [switchMode, setSwitchMode] = useState(true);

  const [leftCurrencies, setLeftCurrencies] = useState<Array<Currency>>(cryptocurrencies);
  const [currentLeftCurrencyName, setCurrentLeftCurrencyName] = useState(leftCurrencies[0].name);

  const [rightCurrencies, setRightCurrencies] = useState<Array<Currency>>(currencies);
  const [currentRightCurrencyName, setCurrentRightCurrencyName] = useState(rightCurrencies[0].name);

  const handleSwitch = useCallback((e: SyntheticEvent) => {
    setCurrentLeftCurrencyName(currentRightCurrencyName);
    setCurrentRightCurrencyName(currentLeftCurrencyName);

    if (!switchMode) {
      setLeftCurrencies(cryptocurrencies);
      setRightCurrencies(currencies);
    } else {
      setLeftCurrencies(currencies);
      setRightCurrencies(cryptocurrencies);
    }

    setSwitchMode(prev => !prev);
    e.currentTarget.classList.toggle(styles.switcher_turned);
  }, [cryptocurrencies, currencies, currentLeftCurrencyName, currentRightCurrencyName, switchMode]);

  // обработчик для Select
  const handleLeftChange = useCallback((e: SelectChangeEvent) => {
    setCurrentLeftCurrencyName(e.target.value as string);
  }, []);

  // обработчик клика по кнопке валюты (с свг-шкой)
  const onCurrencyChange = (name: string) => (evt: SyntheticEvent) => {
    setCurrentLeftCurrencyName(name);
  }

  return (
    <div className={styles.container}>
      <div>
        <ul className={`list ${styles.currencies}`}>
        {leftCurrencies.map(item => (
          <li key={item.name} onClick={onCurrencyChange(item.name)}>
            <WithIcon
              Ico={item.ico}
              text={item.name}
              style={currentLeftCurrencyName === item.name ? (
                {
                  backgroundColor: 'black',
                  color: 'white',
                }
              ) : (
                {}
              )}
            />
          </li>
        ))}
        </ul>
      <InputLabel htmlFor='anountInput'>Amount</InputLabel>
      <Input
        id='amountInput'
        className={styles.input}
        autoComplete='off'
        disableUnderline
        endAdornment={
          <InputAdornment position='end'>
            <Select
              value={currentLeftCurrencyName}
              onChange={handleLeftChange}
            >
              {leftCurrencies.map(item => (
                <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
              ))}
            </Select>
          </InputAdornment>
        }
      />
      </div>
      <Button variant='contained' className={styles.switcher} onClick={handleSwitch}>
        <SwitcherSVG width={30} height={30} className={styles.svg} />
      </Button>
    </div>
  )
}

export default Widget;
