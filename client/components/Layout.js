import Header from '/components/layout/Header'
import Footer from '/components/layout/Footer'
import AdminBar from '/front/AdminBar'

export default function Layout({ style={}, children, page }) {
    return (
        <>
            <div style={{ flex: 1, ...style }}>
                <Header/>
                {children}
            </div>
            <Footer/>
            <AdminBar/>
        </>
    )
}