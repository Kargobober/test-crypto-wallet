import { FC, ReactNode } from 'react';
import styles from './WithIcon.module.css';

type TProps = {
  Ico: any;
  text: string;
};

const WithIcon: FC<TProps> = ({ Ico, text }) => {
  console.log({Ico});
  return (
    <div className={styles.container}>
      <Ico width={24} height={24} />
      <p>{text}</p>
    </div>
  )
}

export default WithIcon;
