import { FC } from 'react';
import styles from './WithIcon.module.css';

type TProps = {
  Ico: any;
  text: string;
  isActive: boolean;
};

const WithIcon: FC<TProps> = ({ Ico, text, isActive }) => {
  return (
    <div
      className={styles.container + ' ' + (isActive ? styles.container_active : '')}
    >
      <Ico width={24} height={24} />
      <span>{text}</span>
    </div>
  )
}

export default WithIcon;
