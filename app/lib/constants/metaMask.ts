import { formatChainAsNum } from "../utils";

export class Chain {
  name: string;
  fullName: string;
  hex: string;
  decimal: number;

  constructor(
    name: string,
    type: 'main' | 'test',
    hex: string,
  ) {
    this.name = name;
    this.fullName = `${name} (${type === 'main' ? 'Mainnet' : 'Testnet'})`;
    this.hex = hex;
    this.decimal = formatChainAsNum(hex);
  }
}

const ChainEthereum = new Chain('Ethereum', 'main', '0x1');
const ChainBNB = new Chain('BNB', 'main', '0x38');
const ChainGoerli = new Chain('Goerli', 'test', '0x5');
const ChainSepolia = new Chain('Sepolia', 'test', '0xaa36a7');
const ChainLinea = new Chain('Linea', 'test', '0xe704');

export const chains: Chain[] = [
  ChainEthereum,
  ChainBNB,
  ChainGoerli,
  ChainSepolia,
  ChainLinea,
];
