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
            content="Generate memes using freeze frame images from James Q Quick's videos."
          />
          <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
          <meta name="twitter:card" content="photo" key="twitter-card" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/jamesqquick/image/upload/c_fill,w_960,h_540,g_auto/l_text:Source%20Sans%20Pro_80_bold_stroke:What%20if%20I%20wrote,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_north/l_text:Source%20Sans%20Pro_80_bold_stroke:a%20Meme%20Generator%3F,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_south/f_auto/q_auto/v1/jqq-memes/50_nuzdle?_a=AVAAEDV0"
            key="og-image"
          />
          <meta
            property="twitter:image:alt"
            content="Meme created with James Q Quick's face"
          />
          <meta
            property="twitter:image"
            content="https://res.cloudinary.com/jamesqquick/image/upload/c_fill,w_960,h_540,g_auto/l_text:Source%20Sans%20Pro_80_bold_stroke:What%20if%20I%20wrote,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_north/l_text:Source%20Sans%20Pro_80_bold_stroke:a%20Meme%20Generator%3F,w_960,c_fit,co_white,bo_20px_solid_black/fl_layer_apply,fl_no_overflow,y_20,x_0,g_south/f_auto/q_auto/v1/jqq-memes/50_nuzdle?_a=AVAAEDV0"
            key="twitter-image"
          />

          <meta name="twitter:site" content={process.env.NEXT_PUBLIC_APP_URL} />
          <meta
            name="twitter:description"
            content="Generate memes of James Q Quick"
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
