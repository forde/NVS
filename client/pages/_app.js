import { UserProvider } from '@auth0/nextjs-auth0'
import Head from 'next/head'

export default function App({ Component, pageProps }) {

    return <>
        <Head>
            <meta charSet="utf-8" />
            <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, shrink-to-fit=yes" />
        </Head>
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    </>
}