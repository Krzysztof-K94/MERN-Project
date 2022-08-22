import { useAppContext } from "../contex/appContext";
import {FormRow, FormRowSelect, Alert} from './index.js';
import Wrapper from "../assets/wrappers/SearchContainer.js";

const SearchContainer = () => {
  const {clearFilters, isLoading, showAlert,searchStatus,searchType, statusOptions, jobTypeOptions, handleChange, sort, sortOptions,search} = useAppContext();

  const handleSearchInput = (e) =>{
    if(isLoading) return;
    const {name, value} = e.target;
    handleChange({name, value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-center">
          {showAlert && <Alert />}
          <FormRow type='text' name='search' value={search} handleChange={handleSearchInput}/>
          <FormRowSelect name='searchStatus' value={searchStatus} list={['all',...statusOptions]} handleChange={handleSearchInput} />
          <FormRowSelect labelText='Type' name='searchType' value={searchType} list={['all',...jobTypeOptions]} handleChange={handleSearchInput} />
          <FormRowSelect name='sort' value={sort} list={sortOptions} handleChange={handleSearchInput} />
          <button type="button" className="btn btn-block btn-danger" onClick={() => console.log('sd')} disabled={isLoading}>Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  )
};
export default SearchContainer;