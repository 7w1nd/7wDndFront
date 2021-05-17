import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        return renderPage();
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>7w DnD</title>
                </Head>
                <body style={{
                    margin: 0,
                    backgroundImage: `url('/wallpapers.jpeg')`,
                    backgroundPosition: 'top'
                }}>
                    <noscript>You need to enable JavaScript to run this app.</noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}