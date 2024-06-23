import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import validator from "validator";

import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (email, password) => {
        const success = await handleInputErrors(email, password);
        if (!success) return;
        setLoading(true);
        try {
            const res = await axios.post('/api/v1/auth/login',
                JSON.stringify({ email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                });


            // console.log(JSON.stringify(res))
            if (res?.data?.status === 'success') {
                toast.success('Successfully signed in!')
            }
            // const data = await res.json();
            // if (data.error) {
            //     throw new Error(data.error);
            // }

            // localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(res);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};
export default useLogin;

async function handleInputErrors(email, password) {
    if (!email || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (!validator.isEmail(email)) {
        toast.error('Please enter a valid email.')
        return false
    }

    return true;
}
