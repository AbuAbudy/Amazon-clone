import React, { useState, useContext, useEffect } from 'react'
import classes from '../Auth/Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Utility/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/Action.type'
import { ClipLoader } from 'react-spinners'

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    SignIn: false,
    SignUp: false,
  });
  const navigate = useNavigate();

  // ✅ Only log when user changes (no spam on every keystroke)
  useEffect(() => {
    if (user) {
      console.log("Current user:", user);
    }
  }, [user]);

  const authHandler = async (e) => {
    e.preventDefault();

    const action = e.target.name;

    if (action === "SignIn") {
      setLoading({ ...loading, SignIn: true });
      navigate('/');
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, SignIn: false });
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, SignIn: false });
        });

    } else if (action === "SignUp") {
      setLoading({ ...loading, SignUp: true });
      navigate('/');
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, SignUp: false });
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, SignUp: false });
        });
    }
  };

  return (
    <section className={classes.auth}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png?20250504041148"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.auth__container}>
        <h1>Sign In</h1>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="button"
            name="SignIn"
            onClick={authHandler}
            className={classes.auth__signinbtn}
            disabled={loading.SignIn}
          >
            {loading.SignIn ? <ClipLoader size={20} /> : "Sign In"}
          </button>
        </form>

        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of use &
          sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice
        </p>

        {/* Create acc btn */}
        <button
          type="button"
          name="SignUp"
          onClick={authHandler}
          className={classes.register__btn}
          disabled={loading.SignUp}
        >
          {loading.SignUp ? (
            <ClipLoader size={20} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
