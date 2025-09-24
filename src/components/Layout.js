import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';
import Script from 'next/script'; // Import the Script component

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      {/* --- Add the Google Analytics scripts here --- */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-NRK9KYSS6C" 
        strategy="afterInteractive" 
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NRK9KYSS6C');
        `}
      </Script>
      
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}