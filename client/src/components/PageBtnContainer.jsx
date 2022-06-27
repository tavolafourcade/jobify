import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/PageBtnContainer'

function PageBtnContainer() {
  const { numOfPages, page, changePage } = useAppContext()

  // create an array of numbers from 1 to numOfPages
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = 1
    }
    changePage(newPage)
  }

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = numOfPages
    }
    changePage(newPage)
  }
  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button type="button" className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} key={pageNumber} onClick={() => changePage(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
      <button type="button" className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
