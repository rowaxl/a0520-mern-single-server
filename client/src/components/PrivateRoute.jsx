import React from 'react'
import {Route, Redirect} from "react-router-dom"
import { connect } from "react-redux";

const PrivateRoute = (props) => {
    return !!props.auth ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ):
    <Redirect to="/" />
}

const mapStateToProps = ({ auth : { user }}) => {
    return { auth: user }
}

export default connect(mapStateToProps)(PrivateRoute)
