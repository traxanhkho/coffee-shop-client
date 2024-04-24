import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useStore from "../store";
import axios from "axios";
import { useForm } from "react-hook-form";

const initialForm = {
  email: "",
  password: "",
};

function Login(props) {
  const { setAuthenticatedUser } = props;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const user = useStore((store) => store.user);
  const setUser = useStore((store) => store.setUser);
  const loginUrl = useStore((store) => store.loginUrl);
  const getUserByAccessToken = useStore((store) => store.getUserByAccessToken);

  const history = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const onErrors = (errors) => console.error(errors);

  useEffect(() => {}, []);

  async function onFormSubmit(data) {
    // event.preventDefault();

    // return console.log(data);
    const loginUser = {
      email: data.email,
      password: data.password,
    };

    try {
      axios.defaults.withCredentials = true;

      const login = await axios.post(loginUrl, {
        ...loginUser,
      });

      const user = await getUserByAccessToken(
        `Bearer ${login.data.access_token}`
      );
      if (user) {
        if (user?.response?.status > 200) {
          setError("root.serverError", {
            type: user.response.status,
          });

          return console.error("error login: ", user.response.status);
        } else {
          sessionStorage.setItem(
            "access_token",
            `Bearer ${login.data.access_token}`
          );

          setUser(initialForm);
          if (user.data) {
            setAuthenticatedUser(user.data);
            history.push("/");
          }
        }
      }
    } catch (error) {
      console.error("error login: ", error);
    }
  }

  return (
    <>
      <main className="loginWrapper">
        <h2 className="center space-down">Login</h2>

        <form
          className="loginForm container"
          onSubmit={handleSubmit(onFormSubmit, onErrors)}
         
        >
          <div
            className={
              errors?.email ? "hasError container-input" : "container-input"
            }
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required.",
                value: user.email,
                onChange: handleChange,
              })}
            />
            <small className="text-danger">
              {errors?.email && errors.email.message}
            </small>
            <div className="noti-not_auth"> 
              {errors?.root?.serverError?.type === 401 &&
                "Invalid Email or Password"}
            </div>  
          </div>
          <div
            className={
              errors?.password ? "hasError container-input" : "container-input"
            }
          >
            <input
              type="password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                value: user.password,
                onChange: handleChange,
              })}
              placeholder="Password"
            />
            <small className="text-danger">
              {errors?.password && errors.password.message}
            </small>
          </div>

          <button className="button">Login</button>
        </form>
      </main>
    </>
  );
}

export default Login;
