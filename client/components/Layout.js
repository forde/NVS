import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'

export default function Layout({ style={}, children }) {
    return (
        <>
            <div style={{ flex: 1, ...style }}>
                <Header/>
                {children}
            </div>
            <Footer/>
        </>
    )
}