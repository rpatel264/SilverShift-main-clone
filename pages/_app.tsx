import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ListingProvider } from "@/context/ListingContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ListingProvider>
        <Component {...pageProps} />
      </ListingProvider>
    </AuthProvider>
  );
}
