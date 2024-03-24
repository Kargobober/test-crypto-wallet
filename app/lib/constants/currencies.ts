import { ReactNode } from "react";
import USDSvg from '@/public/currencies/dollar-minimalistic-svgrepo-com.svg';
import EURSvg from '@/public/currencies/euro-svgrepo-com.svg';
import RUBSvg from '@/public/currencies/ruble-circle-svgrepo-com.svg';
import BTCSvg from '@/public/currencies/bitcoin-logo-svgrepo-com.svg';
import ETHSvg from '@/public/currencies/eth-svgrepo-com.svg';

export class Currency {
  name: string;
  ico: ReactNode;

  constructor(
    name: string,
    ico: ReactNode,
  ) {
    this.name = name;
    this.ico = ico;
  }
}

export const USD = new Currency('USD', USDSvg);
const EUR = new Currency('EUR', EURSvg);
const RUB = new Currency('RUB', RUBSvg);

const BTC = new Currency('BTC', BTCSvg);
export const ETH = new Currency('ETH', ETHSvg);

export const availableCurrencues = [USD, EUR, RUB];
export const availableCryptocurrencues = [BTC, ETH];
