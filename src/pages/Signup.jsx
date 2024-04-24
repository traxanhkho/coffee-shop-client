import { useState } from "react";
import { useNavigate } from "react-router";
import useStore from "../store";
import PhoneInput from "react-phone-input-2";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

const initialForm = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  address: "",
  number_phone: "",
};

function Signup(props) {
  const { setAuthenticatedUser } = props;

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const user = useStore((store) => store.user);
  const getUserByAccessToken = useStore((store) => store.getUserByAccessToken);
  const setUser = useStore((store) => store.setUser);
  const signinUrl = useStore((store) => store.signinUrl);

  // const [user, setUser] = useState(initialForm)
  const history = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function onFormSubmit() {
    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      number_phone: user.number_phone,
    };

    if (userData?.number_phone == "") {
      return setError("root.number_phone", {
        type: 1,
      });
    }

    try {
      axios.defaults.withCredentials = true;

      const register = await axios.post(signinUrl, { ...userData });

      const user = await getUserByAccessToken(
        `Bearer ${register.data.access_token}`
      );

      if (user) {
        if (user?.response?.status > 200) {
          const errors = user.response.errors;

          return console.log("error register: ", errors);
        } else {
          sessionStorage.setItem(
            "access_token",
            `Bearer ${register.data.access_token}`
          );

          setUser(initialForm);
          history("/");
        }
      }
    } catch (errors) {
      // const errorsData = errors.response.data.errors;

      // const errorKeys = Object.keys(errorsData);
      // errorKeys.forEach((keyError) => {
      //   setError(keyError, {
      //     message: errorsData[keyError][0],
      //   });
      // });

      console.error("error login: ", errors);
    }
  }

  return (
    <>
      <main className="loginWrapper">
        <h2 className="center space-down">Sign Up with us</h2>
        <form
          className="signupForm container"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div
            className={
              errors?.name ? "hasError container-input" : "container-input"
            }
          >
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                value: user.name,
                onChange: handleChange,
              })}
            />
            <small className="text-danger">
              {errors?.name && errors.name.message}
            </small>

            <div className="noti-not_auth">
              {errors?.root?.serverError?.type === 401 &&
                errors?.root?.serverError?.message}
              {errors?.root?.number_phone?.type === 1 &&
                "Number Phone is Required."}
            </div>
          </div>

          <PhoneInput
            className="number"
            containerClass="containerClass_phone"
            inputClass="phone_number_field"
            country={"vn"}
            inputProps={{
              name: "number_phone",
              required: true,
              autoFocus: true,
            }}
            defaultErrorMessage="Number Phone invalid."
            value={user.number_phone}
            onChange={(value) => setUser({ ...user, ["number_phone"]: value })}
          />
          <div
            className={
              errors?.address ? "hasError container-input" : "container-input"
            }
          >
            <input
              type="text"
              placeholder="Address"
              {...register("address", {
                required: "Address is required",
                value: user.password,
                onChange: handleChange,
                minLength: {
                  value: 16,
                  message: "Address must have at least 16 characters",
                },
              })}
            />
            <small className="text-danger">
              {errors?.address && errors.address.message}
            </small>
          </div>

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

          <div
            className={
              errors?.password_confirmation
                ? "hasError container-input"
                : "container-input"
            }
          >
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("password_confirmation", {
                required: "Confirm Password is required",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do not match";
                  }
                },
                value: user.password_confirmation,
                onChange: handleChange,
              })}
            />
            <small className="text-danger">
              {errors?.password_confirmation &&
                errors.password_confirmation.message}
            </small>
          </div>

          <button className="button btnSignup">Submit</button>
        </form>
      </main>
      {/* <Basket className="" /> */}
    </>
  );
}

export default Signup;
