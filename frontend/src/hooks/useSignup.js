import { useState } from "react";
import toast from "react-hot-toast";
import validator from "validator"
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	// the below line is to show the loading icon in signup button which runs after submitting data
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ name, email, password, passwordConfirm }) => {
		const success = await handleInputErrors({ name, email, password, passwordConfirm });
		if (!success) return;

		setLoading(true)
		try {
			const res = await axios.post("/api/v1/auth/signup",
				JSON.stringify({ name, email, password, passwordConfirm }),
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
			// 	// when throw is called then it jumps to catch(error) where it will be handled properly
			// 	throw new Error(data.error)

			setAuthUser(res.data);

		} catch (error) {
			toast.error(error.message)
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

async function handleInputErrors({ name, email, password, passwordConfirm }) {
	if (!name || !email || !password || !passwordConfirm) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== passwordConfirm) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 8) {
		toast.error("Password must be at least 8 characters");
		return false;
	}

	if (name.length > 15) {
		toast.error("Name must not exceed 15 characters");
		return false;
	}

	if (!validator.isEmail(email)) {
		toast.error('Please enter a valid email.')
		return false
	}

	return true;

}
