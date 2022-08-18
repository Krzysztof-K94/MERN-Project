import { useAppContext } from "../contex/appContext";
import {FormRow, FormRowSelect, Alert} from './index.js';
import Wrapper from "../assets/wrappers/SearchContainer.js";

const SearchContainer = () => {
  const {showAlert,status,jobType, statusOptions, jobTypeOptions, handleChange} = useAppContext();

  const handleSearchInput = (e) =>{
    const {name, value} = e.target;
    handleChange({name, value});
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={() => console.log('sd')}>
        <div className="form-center">
          {showAlert && <Alert />}
          <FormRow type='text' name='search' value='sd' handleChange={handleSearchInput}/>
          <FormRowSelect name='status' value={status} list={statusOptions} handleChange={handleSearchInput} />
          <FormRowSelect labelText='Type' name='jobType' value={jobType} list={jobTypeOptions} handleChange={handleSearchInput} />
          <FormRowSelect name='status' value={status} list={statusOptions} handleChange={handleSearchInput} />
          <button type="button" className="btn btn-block btn-danger" onClick={() => console.log('sd')}>Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  )
};
export default SearchContainer;