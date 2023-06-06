import { UserProvider } from "@/hooks/UserContext";
import "../app/globals.css";
import Head from "next/head";
import { PaperProvider } from "@/hooks/PaperContext";
import { Questrial } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <PaperProvider>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#3b82f6" />
          <meta
            name="description"
            content="Next Gen online exam platform. Create and share your test with modern UI."
          />
          <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
          <meta name="twitter:card" content="photo" key="twitter-card" />
          <meta
            property="og:image"
            content="../../public/exam-studio-meta.jpg"
            key="og-image"
          />
          <meta
            property="twitter:image:alt"
            content="Next Gen online exam platform. Create and share your test with modern UI."
          />
          <meta
            property="twitter:image"
            content="../../public/exam-studio-meta.jpg"
            key="twitter-image"
          />

          <meta name="twitter:site" content={process.env.NEXT_PUBLIC_APP_URL} />
          <meta
            name="twitter:description"
            content="Next Gen online exam platform. Create and share your test with modern UI."
          />
          <meta name="twitter:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        </Head>

        <main
          className={`flex min-h-screen py-32 lg:py-24 px-6 lg:px-12 ${questrial.className}`}
        >
          <Component {...pageProps} />
        </main>
      </PaperProvider>
    </UserProvider>
  );
}
