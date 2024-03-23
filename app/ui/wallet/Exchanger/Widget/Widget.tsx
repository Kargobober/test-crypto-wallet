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

  const [rightCurrencies, setRightCurrencies] = useState<Array<Currency>>(mode === 0 ? currencies : cryptocurrencies);
  const [currentRightCurrencyName, setCurrentRightCurrencyName] = useState(rightCurrencies[mode === 0 ? 0 : 1].name);

  const [valueLeftInput, setValueLeftInput] = useState<number>(0);
  const [valueRightInput, setValueRightInput] = useState<number>(0);

  // коэффициент перевода из одной валюты в другую. Хардкод
  const [currencyFactor, setCurrencyFactor] = useState<number>(2542.06);
  // комиссия за транзакцию
  const [commission, setCommission] = useState<number>(10);

  const handleSwitch = useCallback((e: SyntheticEvent) => {
    setCurrentLeftCurrencyName(currentRightCurrencyName);
    setCurrentRightCurrencyName(currentLeftCurrencyName);

    if (mode === 0) { // режим покупки крипты
      if (!switchMode) {
        setLeftCurrencies(cryptocurrencies);
        setRightCurrencies(currencies);
      } else {
        setLeftCurrencies(currencies);
        setRightCurrencies(cryptocurrencies);
      }
    }

    setSwitchMode(prev => !prev);
    e.currentTarget.classList.toggle(styles.switcher_turned);
  }, [
    cryptocurrencies,
    currencies,
    currentLeftCurrencyName,
    currentRightCurrencyName,
    mode,
    switchMode
  ]);

  // обработчик для Select
  const handleLeftChange = useCallback((e: SelectChangeEvent) => {
    if (mode === 1 && e.target.value === currentRightCurrencyName) {
      setCurrentRightCurrencyName(currentLeftCurrencyName);
    }
    setCurrentLeftCurrencyName(e.target.value as string);
  }, [currentLeftCurrencyName, currentRightCurrencyName, mode]);

  // обработчик клика по кнопке валюты (с свг-шкой)
  const onCurrencyChange = (name: string, side: 'left' | 'right') => (evt: SyntheticEvent) => {
    if (side === 'left') {
      if (mode === 1 && name === currentRightCurrencyName) {
        setCurrentRightCurrencyName(currentLeftCurrencyName);
      }
      setCurrentLeftCurrencyName(name);
    } else {
      if (mode === 1 && name === currentLeftCurrencyName) {
        setCurrentLeftCurrencyName(currentRightCurrencyName);
      }
      setCurrentRightCurrencyName(name);
    }
  };

  useEffect(() => {
    setValueRightInput(currencyFactor * valueLeftInput * (1 - commission / 100));
  }, [valueLeftInput, currencyFactor, commission]);

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
        sx={{
          '& .Mui-disabled': {
            color: 'black',
            WebkitTextFillColor: 'rgb(0, 0, 0)',
          }
        }}
        autoComplete='off'
        disableUnderline
        type='number'
        value={valueRightInput}
        disabled
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
