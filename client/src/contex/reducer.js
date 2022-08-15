import { initialState } from "./appContext";
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
} from "./actions";

const reducer = (state, action) => {
  if(action.type === DISPLAY_ALERT){
    return {...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values!'}
  }
  if(action.type === CLEAR_ALERT){
    return {...state, showAlert:false, alertType: '', alertText: ''};
  }
  if(action.type === SETUP_USER_BEGIN) {
    return {...state, isLoading: true,};
  }
  if(action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText
    }
  }
  if(action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if(action.type === TOGGLE_SIDEBAR) {
    return {
      ...state, 
      showSidebar: !state.showSidebar};
  }
  if(action.type === LOGOUT_USER){
    return {...initialState}
  }

  if(action.type === UPDATE_USER_BEGIN) {
    return {...state, isLoading: true,};
  }
  if(action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User successful updated'
    }
  }
  if(action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Cant update the user',
    }
  }

  throw new Error(`no sucha action: ${action.type}`);
};

export default reducer;