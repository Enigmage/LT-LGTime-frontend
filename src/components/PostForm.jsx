import axios from "axios";
import { useEffect, useState } from "react";
import { useError, useForm } from "../utils";
import { AppBar } from "./Navbar";
import { Redirect } from "react-router-dom";

export const PostForm = ({ isLogin, longitude, latitude, error }) => {
    const [fields, setFields] = useForm({
        title: "",
        text: "",
    });
    const [posted, setPosted] = useState(false);
    const [image, setImage] = useState("");
    const [errors, setErrors] = useError({
        title: "",
        text: "",
        geoError: "",
        apiError: "",
        imageError: "",
    });
    useEffect(() => {
        if (fields.title.length > 15) {
            setErrors(
                "title",
                "Title should not be longer than 15 characters !"
            );
        } else {
            setErrors("title", "");
        }
    }, [fields.title]);
    useEffect(() => {
        if (fields.text.length > 30)
            setErrors(
                "text",
                "Text should not be greater than 30 characters !"
            );
        else setErrors("text", "");
    }, [fields.text]);
    const handleSubmit = async (e) => {
        const headerObj = {
            token: localStorage.getItem("token"),
        };
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", fields.title);
        formData.append("text", fields.text);
        if (error) {
            setErrors("geoError", "Can't post " + error);
            return;
        } else {
            formData.append("longitude", longitude);
            formData.append("latitude", latitude);
        }

        if (image) {
            if (image.size > 200000) {
                setErrors("imageError", "File size larger than 200kb !!");
                return;
            } else {
                formData.append("image", image, image.name);
            }
        }
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/posts/create`,
                formData,
                {
                    headers: headerObj,
                }
            );
            setPosted(true);
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data)
                setErrors("apiError", err.response.data.message);
        }
    };
    if (posted) return <Redirect to="/" />;
    return (
        <div>
            <AppBar isLogin={isLogin} />
            <div className="wrapper">
                <div className="form">
                    <h1 className="title"> Create Post </h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter post title"
                            value={fields.title}
                            onChange={setFields}
                            className={`input ${
                                fields.title
                                    ? errors.title === ""
                                        ? ""
                                        : "flash-red"
                                    : ""
                            }`}
                            required
                        />
                        <div align="center">
                            <span style={{ color: "red" }}>{errors.title}</span>
                        </div>
                        <input
                            type="text"
                            name="text"
                            placeholder="Enter short text"
                            value={fields.text}
                            onChange={setFields}
                            className={`input ${
                                fields.text
                                    ? errors.text === ""
                                        ? ""
                                        : "flash-red"
                                    : ""
                            }`}
                            required
                        />
                        <div align="center">
                            <span style={{ color: "red" }}>{errors.text}</span>
                        </div>
                        <input
                            type="file"
                            multiple={false}
                            className="input"
                            name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <div align="center">
                            <span style={{ color: "black" }}>
                                <p>*Max file size 200kb</p>
                            </span>
                            <span style={{ color: "red" }}>
                                {errors.geoError}
                            </span>
                            <span style={{ color: "red" }}>
                                {errors.imageError}
                            </span>
                            <span style={{ color: "red" }}>
                                {errors.apiError}
                            </span>
                            <button
                                disabled={
                                    errors.title !== "" || errors.text !== ""
                                }
                                type="submit"
                                className="button">
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
