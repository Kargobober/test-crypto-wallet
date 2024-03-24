'use client';
import { MetaMaskContextProvider } from '../lib/hooks/useMetaMask';
import { Display } from '../ui/wallet/Display';
import { Navigation } from '../ui/wallet/Navigation';
import styles from './page.module.css';

function Page() {
  return (
    <MetaMaskContextProvider>
      <div className={styles.walletContainer}>
        <Navigation />
        <Display />
      </div>
    </MetaMaskContextProvider>
  )
}

export default Page;
