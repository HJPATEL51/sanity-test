import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/common/layout";
import { Provider } from "react-redux";
import store from "@/store/store";
import Head from "next/head";

export default function App({ Component, pageProps, ...rest }: AppProps) {
  return (
    <>
      <Head>
        <title>Le Mot Du Jour</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider
          defaultTheme="light"
          enableSystem={true}
          attribute="class"
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        <style jsx global>{`
          @font-face {
            font-family: "GTAmerica-Regular";
            src: url("/docs/fonts/GT-America-Medium.ttf");
            font-display: swap;
          }
          @font-face {
            font-family: "gtamerica-thin";
            src: url("/docs/fonts/GT-America-Standard-Thin-Trial.otf");
            font-display: swap;
          }
          @font-face {
            font-family: "RecklessNeue-Thin";
            src: url("/docs/fonts/RecklessNeue-Thin.ttf");
            font-display: swap;
          }
          @font-face {
            font-family: "Carrosserie-Bold";
            src: url("/docs/fonts/carrosserie-bold-webfont.ttf");
            font-display: swap;
          }
          @font-face {
            font-family: "RecklessNeue-RegularItalic";
            src: url("/docs/fonts/RecklessNeue-RegularItalic.ttf");
            font-display: swap;
          }
          @font-face {
            font-family: "RecklessNeue-Regular";
            src: url("/docs/fonts/RecklessNeue-Regular.ttf");
            font-display: swap;
          }
          @font-face {
            font-family: "GT-America-Standard-Medium-Trial";
            src: url("/docs/fonts/GT-America-Standard-Medium-Trial.otf");
            font-display: swap;
          }
          @font-face {
            font-family: "RecklessNeue-LightItalic";
            src: url("/docs/fonts/RecklessNeue-LightItalic.ttf");
            font-display: swap;
          }
          @font-face {
            font-family: "TimesRoman";
            src: url("/docs/fonts/times-new-roman.ttf");
            font-display: swap;
          }
        `}</style>
      </Provider>
    </>
  );
}
