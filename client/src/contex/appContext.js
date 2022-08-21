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
  HANDLE_CHANGE,
  CLEAR_VALUES,
  SETUP_JOB_BEGIN,
  SETUP_JOB_SUCCESS,
  SETUP_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  GET_STATS_BEGIN,
  GET_STATS_SUCCESS
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
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
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
  };

  const handleChange = ({name, value}) => {
    dispatch({type:HANDLE_CHANGE, payload: {name, value}});
  };
  
  const clearValues = () => {
    dispatch({type:CLEAR_VALUES});
  };

  const setUpJob = async() => {
    dispatch({type:SETUP_JOB_BEGIN});
    try {
      const {position, company, jobLocation, jobType, status} = state;
      await authFetch.post('/jobs', {position, company, jobLocation, jobType, status});
      dispatch({type: SETUP_JOB_SUCCESS});
      clearValues();
    } catch (error) {
      if(error.response.status === 401) return;
      dispatch({type: SETUP_JOB_ERROR, payload: {msg: error.response.data.msg}});
    }
    clearAlert();
  };
  const getAllJobs = async() => {
    dispatch({type: GET_JOBS_BEGIN});
    try {
      const {data} = await authFetch.get('/jobs');
      const {jobs, totalJobs, numOfPages} = data;
      dispatch({type: GET_JOBS_SUCCESS, payload: {
        jobs,
        totalJobs,
        numOfPages,
      }});
    } catch (error) {
      console.log(error)
      // logOutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({type: SET_EDIT_JOB, payload: {id}});
  };

  const editJob = async(jobId) => {
    dispatch({type: EDIT_JOB_BEGIN});
    const {position, company, jobLocation, jobType, status, editJobId} = state;
    try {
      await authFetch.patch(`/jobs/${editJobId}`, {position, company, jobLocation, jobType, status});
      dispatch({type:EDIT_JOB_SUCCESS});
      dispatch({type:CLEAR_VALUES});
    } catch (error) {
      if(error.status === 401) return;
      dispatch({type: EDIT_JOB_ERROR, payload: {msg: error.response.data.msg}})
    }
  };

  const deleteJob = async(jobId) => {
    dispatch({type: DELETE_JOB_BEGIN});
    try {
      await authFetch.delete(`jobs/${jobId}`);
      getAllJobs();
    } catch (error) {
      logOutUser();
    };
  };

  const getStats = async() => {
    dispatch({type:GET_STATS_BEGIN});
    try {
      const {data} = await authFetch.get('/jobs/stats');
      const {defaultStats, monthlyApplications} = data;
      console.log(monthlyApplications)
      dispatch({type: GET_STATS_SUCCESS, payload: {defaultStats, monthlyApplications}});
    } catch (error) {
      logOutUser();
    }
    clearAlert();
  };
  
  return <AppContext.Provider 
            value={{
              ...state, 
              getStats,
              getAllJobs, 
              displayAlert, 
              clearAlert, 
              setUpUser, 
              toggleSidebar, 
              logOutUser, 
              updateUser, 
              handleChange, 
              clearValues, 
              setUpJob, 
              setEditJob, 
              deleteJob,
              editJob,
              }}>
    {children}
  </AppContext.Provider>
};

const useAppContext = () => {
  return useContext(AppContext);
};

export {AppProvider, initialState, useAppContext}; 