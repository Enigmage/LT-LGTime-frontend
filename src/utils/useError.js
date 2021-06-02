import { useState } from "react";

export const useError = (initialState) => {
    const [errors, setErrors] = useState(initialState);

    return [
        errors,
        (property, message) => {
            setErrors({ ...errors, [property]: message });
        },
    ];
};
