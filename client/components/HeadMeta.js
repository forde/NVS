import Head from 'next/head'
import { withRouter } from 'next/router'

const HeadMeta = withRouter(props => {
    const { title, description, keywords, ogImage, router } = props

    return(
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

            <title>{title || ''}</title>
            <meta name="description" content={description || ''} />
            <meta name="keywords" content={keywords || ''} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, shrink-to-fit=yes" />

            <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL+'/'+router.asPath} />
            <meta property="og:title" content={title || '-'} />
            <meta property="og:description" content={description || '-'}/>
            <meta property="og:image" content={ogImage ? process.env.NEXT_PUBLIC_APP_URL + '/'+ ogImage : process.env.NEXT_PUBLIC_APP_URL + '/fb.png'}/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>

            <meta property="twitter:title" content={title || '-'} />
            <meta property="twitter:description" content={description || ''} />

            <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#ff6400"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"></meta>

        </Head>
    )
})

export default HeadMeta