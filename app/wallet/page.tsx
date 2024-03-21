import { MetaMaskContextProvider } from '../lib/hooks/useMetaMask';
import styles from './page.module.css';

function Page() {
  return (
    <MetaMaskContextProvider>
      <div className={styles.appContainer}>
        1234567
      </div>
    </MetaMaskContextProvider>
  )
}

export default Page;
