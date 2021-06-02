import { Posts } from "./Posts";
import { AppBar } from "./Navbar";
export const Dashboard = ({ isLogin, longitude, latitude, error }) => {
    return (
        <div className="dashboard">
            <AppBar isLogin={isLogin} />
            <Posts
                isLogin={isLogin}
                longitude={longitude}
                latitude={latitude}
                error={error}
            />
        </div>
    );
};
