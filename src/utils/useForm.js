import { useState } from "react";

const useForm = (initial) => {
    const [values, setValues] = useState(initial);

    return [
        values,
        (e) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value,
            });
        },
    ];
};

export default useForm;
