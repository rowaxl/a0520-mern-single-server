import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const NotFound = ({ auth }) => {
    return (
        <div className="container center">
            <h1>404 - Page Not Found!</h1>
            <Link to={auth ? "/surveys" : "/"}>Return to Home</Link>
        </div>
    )
}

const mapStateToProps = ({ auth: { user }}) => {
    return { auth: user }
}

export default connect(mapStateToProps)(NotFound);
