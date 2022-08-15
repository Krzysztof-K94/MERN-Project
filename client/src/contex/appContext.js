import React from 'react';
import {useReducer, useContext} from 'react';
import reducer from './reducer';
import axios from 'axios';
import { 
  DISPLAY_ALERT,
  CLEAR_ALERT, 
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showSidebar: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || ''
};


const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer,initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      
      return response
    },
    (error) => {
      if(error.response.status === 401) logOutUser();
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT});
    clearAlert();
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({type: CLEAR_ALERT});
    }, 3000)
  };

  const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
  }

  const setUserToLocalStorage = ({user, token, location}) => {
    console.log(user, token, location)
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const deleteUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  }

  const setUpUser = async({currentUser, type, alertText}) => {
    dispatch({type: SETUP_USER_BEGIN});

    try {
      const {data} = await axios.post(`/api/v1/auth/${type}`, currentUser);
      const {user, token, location} = data;
      dispatch({type: SETUP_USER_SUCCESS, payload: {
        user,
        token,
        location,
        alertText: alertText,
      }});
      
      setUserToLocalStorage({user, token, location});
    } catch (error) {
      dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.msg}})
    }
    clearAlert();
  }

  const logOutUser = () => {
    deleteUserFromLocalStorage();
    dispatch({type:LOGOUT_USER});
  };

  const updateUser = async(currentUser) => {
    dispatch({type: UPDATE_USER_BEGIN});
    try {
      const {data} = await authFetch.patch('/auth/updateUser', currentUser);
      const {user, location, token} = data;
      setUserToLocalStorage({user,token,location});
      dispatch({type: UPDATE_USER_SUCCESS, payload : {user, location, token}});
    } catch (error) {
      if(error.response.status === 401) return;
      dispatch({type: UPDATE_USER_ERROR, msg: error.response.data.msg});
    }
    clearAlert();
  }
  
  return <AppContext.Provider value={{...state, displayAlert, clearAlert, setUpUser, toggleSidebar, logOutUser, updateUser}}>
    {children}
  </AppContext.Provider>
};

const useAppContext = () => {
  return useContext(AppContext);
};

export {AppProvider, initialState, useAppContext}; 