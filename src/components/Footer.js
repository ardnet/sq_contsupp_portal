import styles from '../styles/Layout.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; {currentYear} SQUARISH. All Rights Reserved.</p>
    </footer>
  );
}