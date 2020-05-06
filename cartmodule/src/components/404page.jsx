import React from 'react';
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (<div>
        <div className="jumbotron text-center">
            <h1>Oops ! This Page is either deleted or not created.</h1>
            <br /> <br />
            <Link to="/">
                <button className="btn btn-lg btn-dark w-50 h-25">Click Here to Go back Home</button>
            </Link>
        </div>
    </div>);
}

export default ErrorPage;