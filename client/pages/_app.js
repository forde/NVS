import { Toaster } from 'react-hot-toast'
import { UserProvider } from '@auth0/nextjs-auth0'

export default function App({ Component, pageProps }) {

    return(
        <UserProvider>
            <Component {...pageProps} />
            <Toaster />
        </UserProvider>
    )
}