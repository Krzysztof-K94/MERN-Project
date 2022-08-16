import {FormRow, Alert, FormRowSelect} from '../../components';
import { useAppContext } from '../../contex/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    isEditing,
    displayAlert,
    showAlert,
    position,
    company, 
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions
  } = useAppContext()

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    console.log('submit')
  }
  const handleJobInput = (e) => {
    console.log(e.target.value)
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow type='text' labelText='Position' name='position' value={position} handleChange={handleJobInput} />
          <FormRow type='text' labelText='Company' name='company' value={company} handleChange={handleJobInput} />
          <FormRow type='text' labelText='Job Location' name='jobLocation' value={jobLocation} handleChange={handleJobInput} />
          <FormRowSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions}/>
          <FormRowSelect labelText='Job type' name='jobType' value={jobType} handleChange={handleJobInput} list={jobTypeOptions}/>
          <div className='btn-container'>
            <button className='btn btn-block submit-btn' type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
};
export default AddJob;