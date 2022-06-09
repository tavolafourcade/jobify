import React from 'react'

function FormRowSelect({
  labelText, name, value, handleChange, list,
}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">{labelText || name}</label>
      <select name={name} id={name} value={value} className="form-input" onChange={handleChange}>
        {list.map((itemValue) => (
          <option key={itemValue} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormRowSelect
