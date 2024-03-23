import { useMetaMask } from '@/app/lib/hooks/useMetaMask';
import { formatAddress } from '@/app/lib/utils';
import styles from './Navigation.module.css';
import { Button } from '@mui/material';

export const Navigation = () => {

  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()

  return (
    <section className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>Next + React + MetaMask</div>
        <div className={styles.rightNav}>
          {!hasProvider &&
            <a href="https://metamask.io" target="_blank" rel="noreferrer">
              Install MetaMask
            </a>
          }
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
            <Button disabled={isConnecting} onClick={connectMetaMask} variant='contained'>
              Connect MetaMask
            </Button>
          }
          {hasProvider && wallet.accounts.length > 0 &&
            <a
              className="text_link tooltip-bottom"
              href={`https://etherscan.io/address/${wallet}`}
              target="_blank"
              data-tooltip="Open in Block Explorer" rel="noreferrer"
            >
              {formatAddress(wallet.accounts[0])}
            </a>
          }
        </div>
      </div>
    </section>
  )
}
