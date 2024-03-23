import { FC, ReactNode } from 'react';
import styles from './WithIcon.module.css';

type TProps = {
  ico: ReactNode;
  text: string;
};

const WithIcon: FC<TProps> = ({ ico, text }) => {
  return (
    <div className={styles.container}>
      {ico}
      <p>{text}</p>
    </div>
  )
}

export default WithIcon;
