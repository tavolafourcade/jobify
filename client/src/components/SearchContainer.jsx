import React from 'react'
// eslint-disable-next-line import/no-cycle
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

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
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
          {/* Search status */}
          <FormRowSelect
            labelText="Status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={[ 'all', ...statusOptions ]}
          />
          {/* Search type */}
          <FormRowSelect
            labelText="Type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={[ 'all', ...jobTypeOptions ]}
          />
          {/* Sort */}
          <FormRowSelect
            labelText="Sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button type="submit" className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>Clear filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
