import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from '../context/AppContext';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AppProvider>
  );
}
