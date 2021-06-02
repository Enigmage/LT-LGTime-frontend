import axios from "axios";
import { useEffect, useState } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from "reactstrap";
import { addDistance } from "../utils";

export const Posts = ({ isLogin, longitude, latitude, error }) => {
    const [appData, setData] = useState([]);
    const handleDelete = async (id) => {
        const headerObject = {
            token: localStorage.getItem("token"),
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/posts/delete/${id}`, {
                headers: headerObject,
            });
            setData(appData.filter((value) => value._id !== id));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/posts/all`
                );
                if (!error && longitude && latitude) {
                    const newData = addDistance(
                        latitude,
                        longitude,
                        response.data
                    );
                    newData.sort((a, b) => a.distance - b.distance);
                    console.log("Sorting");
                    setData(newData);
                } else {
                    setData(response.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPosts();
    }, []);
    return (
        <div className="container pt-3 px-5">
            {appData.map((value) => (
                <div key={value._id} className="dashboard">
                    <Card className="mx-5" style={{backgroundColor:"black"}}>
                        {value.img && (
                            <CardImg
                                top
                                src={`${process.env.REACT_APP_API_URL}/${value.img}`}
                                alt="Card image cap"
                            />
                        )}
                        <CardBody style={{color:"whitesmoke"}}>
                            <CardTitle tag="h5">{value.title}</CardTitle>
                            <CardSubtitle>{value.country}</CardSubtitle>
                            <CardText>{value.text}</CardText>
                            {isLogin && (
                                <Button
                                    className="btn-danger"
                                    onClick={() => handleDelete(value._id)}>
                                    Delete
                                </Button>
                            )}
                        </CardBody>
                    </Card>
                    <br />
                </div>
            ))}
        </div>
    );
};
