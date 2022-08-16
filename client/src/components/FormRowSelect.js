const FormRowSelect = ({name, value,labelText, handleChange, list}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className='from-label'>{labelText || name}</label>
      <select name={name} value={value} onChange={handleChange} className='form-select'>
        {list.map((listItem, index) => <option key={index} value={listItem}>{listItem}</option>)}
      </select>
    </div>
  )

};
export default FormRowSelect;