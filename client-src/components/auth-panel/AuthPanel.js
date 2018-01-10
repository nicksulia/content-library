'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';
import { handleServerErrors } from '../../helpers/handleErrors.js';

class AuthPanel extends PureComponent {
    static propTypes = {
        isAuth: PropTypes.bool.isRequired,
        registerUser: PropTypes.func.isRequired,
        authenticateUser: PropTypes.func.isRequired,
        setToken: PropTypes.func.isRequired,
        setUsername: PropTypes.func.isRequired,
        setAuthStatus: PropTypes.func.isRequired,
        setServerError: PropTypes.func.isRequired,
        username: PropTypes.string,
        serverError: PropTypes.object

    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: ''
        };
        this.renderAuthElements = this.renderAuthElements.bind(this);
    }

    componentDidUpdate() {
        const {
            serverError,
            setAuthStatus,
        } = this.props;

        if (serverError) {
            handleServerErrors(serverError, setAuthStatus);
        }
    }

    renderAuthElements() {
        const {
            name,
            password
        } = this.state;
        const {
            registerUser,
            authenticateUser
        } = this.props;
        return (
            <div styleName = "auth-panel">
                <button onClick={() => { registerUser() }}>Register</button>
                <div styleName="auth-credentials">
                    <div>
                        <label>Name: </label>
                        <input type = "text" onChange={(e) => {
                            this.setState({
                                name: e.target.value,
                                password
                            })
                        }} value={name}/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type = "password" onChange={(e) => {
                            this.setState({
                                name,
                                password: e.target.value
                            })
                        }} value={password}/>
                    </div>
                    <button onClick={() => { authenticateUser({name, password}) }}>Submit</button>
                </div>
            </div>
        )
    }

    render() {
        const {
            isAuth,
            username
        } = this.props;
        return isAuth ? (<div>Welcome, {username}</div>) : this.renderAuthElements();
    }
}

export default CSSModules(AuthPanel, styles);