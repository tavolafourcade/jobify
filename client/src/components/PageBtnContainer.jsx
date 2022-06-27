import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/PageBtnContainer'

function PageBtnContainer() {
  const { numOfPages, page } = useAppContext()

  // create an array of numbers from 1 to numOfPages
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const prevPage = () => {
    console.log('prevPage')
  }

  const nextPage = () => {
    console.log('nextPage')
  }
  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button type="button" className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} key={pageNumber} onClick={() => console.log('change page')}>
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
