import styles from './page.module.css';
import Form from '../components/Form/index';
import Background from '../components/Background/index';

export default function Home() {
  return (
    <main className={styles.main}>
      <Background />
      <Form />
    </main>
  );
}
