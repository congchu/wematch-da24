import React from 'react'
import * as constants from 'constants/env'

import './style.css'
import { Link } from 'react-router-dom'

interface Props {}

const MainHeaderForDetail = ({}: Props) => {
  return (
    <div id="wmWrap" className="main_head">
      <div id="wmHead">
        <div className="wrap_head">
          <h1 className="tit_logo">
            <a href="http://www.wematch.com/" className="link_logo">
              <span className="img_logo">위매치</span>
            </a>
          </h1>
          <div id="wmServices">
            <ul className="list_services">
              <li>
                <a href={constants.MOVE_URL}>이사</a>
              </li>
              <li>
                <a href="/clean">청소</a>
              </li>
              {/* <li><a href={constants.CLEAN_URL}>청소</a></li> */}
              {/*<li><a href={constants.INTERIOR_URL}>인테리어</a></li>*/}
            </ul>
          </div>
          <div id="wmLnb">
            <div className="head_info">
              <Link to="/myrequest" className={'link_request'}>
                내 신청내역
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeaderForDetail
