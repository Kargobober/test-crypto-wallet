'use client';
import { ReactNode, useEffect, useState } from 'react';
import { MetaMaskContextProvider } from '../lib/hooks/useMetaMask';
import { Display } from '../ui/wallet/Display';
import { Navigation } from '../ui/wallet/Navigation';
import styles from './page.module.css';

function Page() {
  const [content, setContent] = useState<ReactNode>(null);

  useEffect(() => {
    setContent((
      <MetaMaskContextProvider>
      <div className={styles.walletContainer}>
        <Navigation />
        <Display />
      </div>
    </MetaMaskContextProvider>
    ))
  }, []);

  return content;
}

export default Page;
