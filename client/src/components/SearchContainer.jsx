import React from 'react'
import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

function SearchContainer() {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext()

  const handleSearch = (e) => {
    if (isLoading) return // prevent search while loading
    handleChange({ name: e.target.name, value: e.target.value })
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        {/* Search position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="search" // name of the input must exactly match the state name
            value={search}
            handleChange={handleSearch}
          />
          {/* Rest of inputs */}
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
