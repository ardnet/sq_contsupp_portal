import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout'; // Import the Layout component

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout> {/* Wrap the Component with Layout */}
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;