import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        return renderPage();
    }

    render() {
        return ( <
            Html >
            <
            Head >
            <
            title > 7 w DnD < /title> <
            /Head> <
            body style = {
                {
                    margin: 0,
                    background: `url('/wallpapers.jpeg') no-repeat center 114px, url('/background_texture.png') #f9f9f9;`,
                    backgroundPosition: 'top'
                }
            } >
            <
            noscript > You need to enable JavaScript to run this app. < /noscript> <
            Main / >
            <
            NextScript / >
            <
            /body> <
            /Html>
        )
    }
}