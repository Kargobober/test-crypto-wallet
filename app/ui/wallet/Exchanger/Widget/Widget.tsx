import { SyntheticEvent, useState, FC, useCallback, useEffect, memo } from 'react';
import styles from './Widget.module.css';
import { WithIcon } from '../WithIcon';
import { Currency, availableCryptocurrencues, availableCurrencues } from '@/app/lib/constants/currencies';
import { Button, Input, InputAdornment, InputLabel, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SwitcherSVG from '@/public/switch-horizontal-svgrepo-com.svg';

type TProps = {
  mode: number;
}

const Widget: FC<TProps> = ({ mode }) => {
  // стейт для хранения доступных счётов пользователя. На данном этапе ХАРДКОД
  const [cryptocurrencies, setCryptocurrencies] = useState<Array<Currency>>(availableCryptocurrencues);
  const [currencies, setCurrencies] = useState<Array<Currency>>(availableCurrencues);

  const [switchMode, setSwitchMode] = useState(true);

  const [leftCurrencies, setLeftCurrencies] = useState<Array<Currency>>(cryptocurrencies);
  const [currentLeftCurrencyName, setCurrentLeftCurrencyName] = useState(leftCurrencies[0].name);

  const [rightCurrencies, setRightCurrencies] = useState<Array<Currency>>(currencies);
  const [currentRightCurrencyName, setCurrentRightCurrencyName] = useState(rightCurrencies[0].name);

  const [valueLeftInput, setValueLeftInput] = useState<number>(0);
  const [valueRightInput, setValueRightInput] = useState<number>(0);

  const [currencyFactor, setCurrencyFactor] = useState<number>(2542.06);
  const [commission, setCommission] = useState<number>(10);

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
  const onCurrencyChange = (name: string, mode: 'left' | 'right') => (evt: SyntheticEvent) => {
    if (mode === 'left') {
      setCurrentLeftCurrencyName(name);
    } else {
      setCurrentRightCurrencyName(name);
    }
  }

  useEffect(() => {
    setValueRightInput(currencyFactor * valueLeftInput);
  }, [valueLeftInput, currencyFactor])

  useEffect(() => {
    setValueLeftInput(valueRightInput / currencyFactor);
  }, [valueRightInput, currencyFactor])

  return (
    <div className={styles.container}>

      <ul className={`list ${styles.leftCurrencies}`}>
        {leftCurrencies.map(item => (
          <li key={item.name} onClick={onCurrencyChange(item.name, 'left')}>
            <WithIcon
              Ico={item.ico}
              text={item.name}
              isActive={currentLeftCurrencyName === item.name}
            />
          </li>
        ))}
      </ul>

      <ul className={`list ${styles.rightCurrencies}`}>
        {rightCurrencies.map(item => (
          <li key={item.name} onClick={onCurrencyChange(item.name, 'right')}>
            <WithIcon
              Ico={item.ico}
              text={item.name}
              isActive={currentRightCurrencyName === item.name}
            />
          </li>
        ))}
      </ul>

      <InputLabel htmlFor='leftInput' className={styles.leftLabel}>
        {mode === 0 ? 'Amount' : 'From'}
      </InputLabel>
      <Input
        id='leftInput'
        className={styles.leftInput}
        autoComplete='off'
        disableUnderline
        type='number'
        value={valueLeftInput}
        onChange={(e) => setValueLeftInput(Number(e.target.value))}
        endAdornment={
          <InputAdornment position='end'>
            <Select
              value={currentLeftCurrencyName}
              onChange={handleLeftChange}
              variant='standard'
              disableUnderline
            >
              {leftCurrencies.map(item => (
                <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
              ))}
            </Select>
          </InputAdornment>
        }
      />

      <Button variant='contained' className={styles.switcher} onClick={handleSwitch}>
        <SwitcherSVG width={30} height={30} className={styles.svg} />
      </Button>

      {mode === 1 && (
        <InputLabel htmlFor='rightInput' className={styles.rightLabel}>
          To
        </InputLabel>
      )}
      <Input
        id='rightInput'
        className={styles.rightInput}
        autoComplete='off'
        disableUnderline
        type='number'
        value={valueRightInput}
        onChange={(e) => setValueRightInput(Number(e.target.value))}
        endAdornment={
          <InputAdornment position='end'>
            {currentRightCurrencyName}
          </InputAdornment>
        }
      />

      <div className={`${styles.additionalDataContainer} text_size_small`}>
        <p>1.00 {currentLeftCurrencyName} = {currencyFactor} {currentRightCurrencyName}</p>
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

    </div>
  )
}

export default memo(Widget);
