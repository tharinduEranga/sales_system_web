import React, {Component} from "react";
import 'assets/css/custom/login.css';

class Login extends Component {
    render() {
        return (
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label htmlFor="tab-1"
                                                                                                  className="tab">Sign
                    In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2"
                                                                                          className="tab">Sign
                    Up</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input id="user" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input"/>
                            </div>
                            <div className="group">
                                <input id="check" type="checkbox" className="check" checked/>
                                <label htmlFor="check"><span className="icon"/> Keep me Signed
                                    in</label>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign In"/>
                            </div>
                            <div className="hr"/>
                            <div className="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;