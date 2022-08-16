import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Logo, FormRow, Alert} from '../components';
import Wrapper from '../assets/wrappers/RegisterPage.js';
import { useAppContext } from '../contex/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const {user, isLoading, showAlert, displayAlert, setUpUser} = useAppContext();

  useEffect(() => {
    if(user) {
      setTimeout(() => {
        navigate('/');
      }, 3000)
    }
  }, [user, navigate]);

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember});
  };
    
  const handleChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value});
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values;
    if(!password || !email || (!isMember && ! name)){
      displayAlert();
      return;
    }
    const currentUser = {name, email, password};
    
    if(isMember) {
      setUpUser({currentUser, type:'login', alertText:'Login successful. Redirecting...'});
      
    } else {
      setUpUser({currentUser, type:'register', alertText:'User Created. Redirecting...'});
    }
  };

    return (
      <Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
          <Logo />
          <h3>{values.isMember ? 'Login' : 'Register'}</h3>
          {showAlert && <Alert />}
          {!values.isMember ? (
            <FormRow type='name' name='name' handleChange={handleChange} value={values.name} labelText='Name'/>) :
            ''
          }
          <FormRow type='email' name='email' handleChange={handleChange} value={values.email} labelText='Email'/>
          <FormRow type='password' name='password' handleChange={handleChange} value={values.password} labelText='Password'/>
          <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
          <p>
            {values.isMember ? 'Not a member yet': 'Already have account'}
            <button type='button' onClick={toggleMember} className="member-btn">{values.isMember ? 'Register' : 'Login'}</button>
          </p>
        </form>
      </Wrapper>
    )
}

export default Register;