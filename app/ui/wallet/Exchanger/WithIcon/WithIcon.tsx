import { CSSProperties, FC } from 'react';
import styles from './WithIcon.module.css';

type TProps = {
  Ico: any;
  text: string;
  style: CSSProperties;
};

const WithIcon: FC<TProps> = ({ Ico, text, style }) => {
  return (
    <div className={styles.container} style={style}>
      <Ico width={24} height={24} />
      <p>{text}</p>
    </div>
  )
}

export default WithIcon;
