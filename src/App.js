import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { PostForm } from "./components/PostForm";
import "./App.css";
import { useState } from "react";
import { usePosition } from "use-position";

const App = () => {
    const [isLogin, setLogin] = useState(() =>
        localStorage.getItem("token") ? true : false
    );
    const watch = true;
    const { latitude, longitude, error } = usePosition(watch);
    const setLoginStatus = (value) => setLogin(value);
    return (
        <Switch>
            <Route
                path="/"
                exact
                render={() => (
                    <Dashboard
                        isLogin={isLogin}
                        longitude={longitude}
                        latitude={latitude}
                        error={error}
                    />
                )}
            />
            <Route
                path="/post_form"
                exact
                render={() => (
                    <PostForm
                        isLogin={isLogin}
                        longitude={longitude}
                        latitude={latitude}
                        error={error}
                    />
                )}
            />
            <Route
                path="/login"
                exact
                render={() => (
                    <LoginForm
                        isLogin={isLogin}
                        setLoginStatus={setLoginStatus}
                    />
                )}
            />
            <Route
                path="/signup"
                exact
                render={() => (
                    <SignupForm
                        isLogin={isLogin}
                        setLoginStatus={setLoginStatus}
                    />
                )}
            />
            <Route
                render={() => (
                    <div>
                        <h1>Oops, wrong URL !!</h1>
                    </div>
                )}
            />
        </Switch>
    );
};

export default App;
