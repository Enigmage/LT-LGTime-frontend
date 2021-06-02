import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useForm, useError } from "../utils";
import { AppBar } from "./Navbar";
import { useEffect } from "react";
import * as EmailValidator from "email-validator";

const LoginForm = ({ isLogin, setLoginStatus }) => {
    const [credentials, setCredentials] = useForm({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useError({
        email: "",
        password: "",
        apiError: "",
    });
    useEffect(() => {
        if (credentials.password && credentials.password.length < 8) {
            setErrors("password", "Password too short");
        } else {
            setErrors("password", "");
        }
    }, [credentials.password]);

    useEffect(() => {
        if (credentials.email && EmailValidator.validate(credentials.email) == false) {
            setErrors("email", "Invalid E-mail");
        } else {
            setErrors("email", "");
        }
    }, [credentials.email]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: credentials.email,
            password: credentials.password,
        };
        try {
            const token = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                data
            );
            localStorage.setItem("token", token.data.token);
            setLoginStatus(true);
            setErrors("apiError", "");
        } catch (err) {
            setErrors("apiError", err.response.data.message);
        }
    };
    if (isLogin) return <Redirect to="/" />;
    return (
        <div>
            <AppBar isLogin={isLogin} />
            <div className="wrapper">
                <div className="form">
                    <h1 className="title">Listiee</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="text"
                            value={credentials.email}
                            onChange={setCredentials}
                            className={`input ${
                                credentials.email
                                    ? errors.email === ""
                                        ? "flash-green"
                                        : "flash-red"
                                    : ""
                            }`}
                            placeholder="email"
                            required
                        />
                        <div align="center">
                            <span style={{ color: "red" }}>{errors.email}</span>
                        </div>
                        <input
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={setCredentials}
                            className={`input ${
                                credentials.password
                                    ? errors.password === ""
                                        ? "flash-green"
                                        : "flash-red"
                                    : ""
                            }`}
                            placeholder="Password"
                            required
                        />
                        <div align="center">
                            <span style={{ color: "red" }}>
                                {errors.password}
                            </span>
                        </div>
                        <div align="center">
                            <button
                                disabled={
                                    errors.email !== "" ||
                                    errors.password !== ""
                                }
                                className="button"
                                type="submit">
                                <span>Login</span>
                            </button>
                        </div>
                    </form>
                    <div align="center">
                        <span style={{ color: "red" }}>{errors.apiError}</span>
                        <br />
                        New user ?{" "}
                        <span style={{ color: "blue" }}>
                            {" "}
                            <Link to="/signup" className="signup-link">
                                {" "}
                                Sign Up
                            </Link>{" "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
