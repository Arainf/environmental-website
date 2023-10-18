import './css/Report.css';
import { Link } from "react-router-dom";

function Report() {
  return (
    <>
      <Link className="text" to="form">
        <div className='reportButton'>
          <button type="button" className="btn btn-primary btn-sm" >
            REPORT NOW
          </button>
        </div>
      </Link>
    </>
  )
}

export default Report;