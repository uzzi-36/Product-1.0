import './App.css';
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from './context/Context';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import axios from 'axios'
import loaderImg from './img/loader.webp'


import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import Login from "./components/login";
import Signup from "./components/signup";



function App() {

  let { state, dispatch } = useContext(GlobalContext);

  console.log("state: ", state);
  // now state login value is checked from context.js 
  // const [isLogin, setIsLogin] = useState(false);




  const logoutHandler = async () => {

    try {
      let response = await axios.post(`${state.baseUrl}/logout`,
        {},
        {
          withCredentials: true
        })
      console.log("response: ", response);

      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (error) {
      console.log("axios error: ", error);
    }

  }


  useEffect(() => {

    const getProfile = async () => {
      try {
        let response = await axios.get(
          `${state.baseUrl}/profile`,
          {
            withCredentials: true,
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          });

        console.log("response: ", response);

        dispatch({
          type: 'USER_LOGIN',
          payload: response.data
        })
      } catch (error) {

        console.log("axios error: ", error);

        dispatch({
          type: 'USER_LOGOUT'
        })
      }



    }
    getProfile();

  }, [])



  useEffect(() => {

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.withCredentials = true;
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }
      return Promise.reject(error);
    });
  }, [])


  return (
    <div>

      {
        (state.isLogin === true) ?
          <nav className='navBar'>
            <ul>
              <li> <Link to={`/`}>Home</Link> </li>
              <li> <Link to={`/gallery`}>Gallery</Link> </li>
              <li> <Link to={`/about`}>About</Link> </li>
              <li> <Link to={`/profile`}>Profile</Link> </li>
            </ul>
            <div>
              {state?.user?.firstName} {state?.user?.lastName}  <button onClick={logoutHandler}>Logout</button>
            </div>
          </nav>
          : null
      }
      {
        (state.isLogin === false) ?
          <nav className='navBar'>
            <ul>
              <li> <Link to={`/`}>Login</Link> </li>
              <li> <Link to={`/signup`}>Signup</Link> </li>
            </ul>
          </nav> : null
      }

      {(state.isLogin === true) ?

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}

      {(state.isLogin === false) ?
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes> : null
      }

      {(state.isLogin === null) ?

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
          <img width={300} src={loaderImg} alt="" />
        </div>

        : null}

    </div>
  );
}

export default App;