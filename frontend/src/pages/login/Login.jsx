import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full w-full bg-white-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-100 p-5">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> QuizApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label pb-0">
              <span className="text-base label-text text-gray-50">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered input-info w-full h-8"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label pb-0">
              <span className="text-base label-text text-gray-50">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-info w-full h-8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <Link
              to="/signup"
              className="text-sm text-gray-50 hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>
          </div>

          <div className="text-center py-3">
            {/* <button className="btn min-h-0 h-8 btn-outline btn-info"> */}
            <button
              className="btn min-h-0 h-8 btn-outline btn-info"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
