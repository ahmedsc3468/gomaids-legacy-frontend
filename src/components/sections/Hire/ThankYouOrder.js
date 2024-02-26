import * as React from 'react';
import Breadcrumb from '../../layouts/Breadcrumb';
import MetaTags from "react-meta-tags";
import Header from '../../layouts/Headerinner';
import Footer from '../../layouts/Footer';

class ThankYou extends React.Component {




    render() {

        return (
            <>
                <MetaTags>
                    <title> GoMaids | Thankyou</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <Breadcrumb breadcrumb={{ pagename: 'Thank you' }} />
                <h2 className='text-center'
                    style={{ color: "#1020432", marginTop: "4rem", marginBottom: "1rem" }}
                >Thankyou</h2>
                <h2 className='text-center'
                    style={{ color: "#1020432", marginTop: "1rem", marginBottom: "8rem" }}
                >Your Order has been placed Successfully</h2>
                <Footer />
            </>
        );
    }
}

export default ThankYou;