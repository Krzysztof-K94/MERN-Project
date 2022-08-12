import React from 'react';
import {useReducer, useContext} from 'react';
import reducer from './reducer';
import axios from 'axios';
import { 
  DISPLAY_ALERT,
  CLEAR_ALERT, 
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: JSON.parse(user) || null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || ''
};


const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer,initialState);

  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT});
    clearAlert();
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({type: CLEAR_ALERT});
    }, 3000)
  };

  const setUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const deleteUserFromLocalStorage = ({user, token, location}) => {
    localStorage.clear('user', user);
    localStorage.clear('token', token);
    localStorage.clear('location', location);
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
  
  return <AppContext.Provider value={{...state, displayAlert, clearAlert, setUpUser}}>
    {children}
  </AppContext.Provider>
};

const useAppContext = () => {
  return useContext(AppContext);
};

export {AppProvider, initialState, useAppContext}; 