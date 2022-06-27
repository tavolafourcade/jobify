import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/PageBtnContainer'

function PageBtnContainer() {
  const { numOfPages, page } = useAppContext()

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
      <div className="btn-container">buttons</div>
      <button type="button" className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
