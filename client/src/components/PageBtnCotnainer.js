import { useAppContext } from "../contex/appContext";
import Wrapper from '../assets/wrappers/PageBtnContainer.js';
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi';

const PageBtnContainer = () => {
  const {numOfPages, page, changePage} = useAppContext();

  const pages = Array.from({length: numOfPages}, (_, index) => {
    return index + 1;
  });

  const prevPage = () => page === 1 ? changePage(1) : changePage(page - 1);
  const nextPage = () => changePage(page + 1);


  return (
    <Wrapper>
      {page !== 1 ? <button className="prev-btn" onClick={prevPage}>{<HiChevronDoubleLeft />}prev</button> : ''}
      <div className="btn-container">
        {pages.map((pageNumber) =>  {
          return (
            <button 
              className={pageNumber === page ? 'active pageBtn' : 'pageBtn'}
              onClick={() => changePage(pageNumber)}
              key={pageNumber}>
                {pageNumber}
            </button>)
        })}
      </div>
      {page !== numOfPages ? <button className="next-btn" onClick={nextPage}>{<HiChevronDoubleRight />}next</button> : ''}
    </Wrapper>
  )
};
export default PageBtnContainer;