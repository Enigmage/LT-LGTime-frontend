import axios from "axios";
import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useError, useForm } from "../utils";
import { AppBar } from "./Navbar";
import * as EmailValidator from "email-validator";

const SignupForm = ({ isLogin, setLoginStatus }) => {
    const [credentials, setCredentials] = useForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useError({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        apiError: "",
    });
    useEffect(() => {
        if (EmailValidator.validate(credentials.email)) {
            setErrors("email", "");
        } else {
            setErrors("email", "Invalid E-mail");
        }
    }, [credentials.email]);
    useEffect(() => {
        if (credentials.username.length > 20) {
            setErrors(
                "username",
                "Username shouldn't be longer than 20 characters !!"
            );
        } else {
            setErrors("username", "");
        }
    }, [credentials.username]);
    useEffect(() => {
        if (credentials.confirmPassword && credentials.confirmPassword !== credentials.password) {
            setErrors("confirmPassword", "Passwords don't match");
        } else {
            setErrors("confirmPassword", "");
        }
    }, [credentials.confirmPassword]);
    useEffect(() => {
        if (credentials.password && credentials.password.length < 8) {
            setErrors(
                "password",
                "Password too short, it should be minimum 8 characters."
            );
        } else {
            setErrors("password", "");
        }
    }, [credentials.password]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: credentials.username,
            password: credentials.password,
            email: credentials.email,
        };
        try {
            const token = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/signup`,
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
            <div className="wrapper" style={{ overflow: "scroll" }}>
                <div className="form">
                    <h1 className="title">Listiee</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="username"
                            type="text"
                            value={credentials.username}
                            className={`input ${
                                credentials.username
                                    ? errors.username === ""
                                        ? "flash-green"
                                        : "flash-red"
                                    : ""
                            }`}
                            onChange={setCredentials}
                            placeholder="Username"
                            required
                        />
                        <div align="center">
                            <span style={{ color: "red" }}>
                                {errors.username}
                            </span>
                        </div>
                        <input
                            name="email"
                            type="text"
                            value={credentials.email}
                            className={`input ${
                                credentials.email
                                    ? errors.email === ""
                                        ? "flash-green"
                                        : "flash-red"
                                    : ""
                            }`}
                            onChange={setCredentials}
                            placeholder="E-mail"
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
                                        ? ""
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
                        <input
                            name="confirmPassword"
                            type="password"
                            value={credentials.confirmPassword}
                            onChange={setCredentials}
                            className={`input ${
                                credentials.confirmPassword
                                    ? credentials.password ===
                                      credentials.confirmPassword
                                        ? "flash-green"
                                        : "flash-red"
                                    : ""
                            }`}
                            placeholder="Confirm Password"
                            required
                        />
                        <div align="center">
                            <span style={{ color: "red" }}>
                                {errors.confirmPassword}
                            </span>
                        </div>
                        <div align="center">
                            <button
                                disabled={
                                    credentials.password !==
                                        credentials.confirmPassword ||
                                    errors.username !== "" ||
                                    errors.email !== ""
                                }
                                className="button"
                                type="submit">
                                <span>Sign Up</span>
                            </button>
                        </div>
                    </form>
                    <div align="center">
                        <span style={{ color: "red" }}>{errors.apiError}</span>
                        <br />
                        <span style={{ color: "black" }}>
                            Already have an account ?{" "}
                            <span style={{ color: "blue" }}>
                                {" "}
                                <Link to="/login" className="login-link">
                                    {" "}
                                    Log In{" "}
                                </Link>{" "}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignupForm;
