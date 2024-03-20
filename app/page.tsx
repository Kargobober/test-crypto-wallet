import { Button } from "@mui/material";
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1>Crypto Wallet</h1>

        <p>С возвращением!</p>

        <Button
          variant='contained'
          href='/wallet'
          component={NextLink}
          className={styles.btn}
        >
          Открыть кошелёк
        </Button>
      </section>
    </main>
  );
}
