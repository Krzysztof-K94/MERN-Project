import { useState } from "react";
import { useAppContext } from "../../contex/appContext";
import {FormRow, Alert} from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const {user, showAlert, displayAlert, clearAlert, isLoading, updateUser} = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !lastName || !location) {
      displayAlert();
       return;
    } 
    updateUser({name, email, lastName, location});
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow type='text' name='name' value={name} handleChange={(e) => setName(e.target.value)} labelText='Name'/>
          <FormRow type='text' name='lastName' value={lastName} handleChange={(e) => setLastName(e.target.value)} labelText='Last Name'/>
          <FormRow type='email' name='email' value={email} handleChange={(e) => setEmail(e.target.value)} labelText='Email'/>
          <FormRow type='text' name='location' value={location} handleChange={(e) => setLocation(e.target.value)} labelText='Location'/>
          <button type="submit" className="btn btn-block" disabled={isLoading}>Save Changes</button>
        </div>
      </form>
    </Wrapper>
  )
};
export default Profile;