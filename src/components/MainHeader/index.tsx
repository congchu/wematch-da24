import React from 'react'
import * as constants from 'constants/env'

import "./style.css"

interface Props {}

const MainHeader = ({}: Props) => {
    return (
        <div id="wmWrap" className="main_head">
            <div id="wmHead">
                <div className="wrap_head">
                    <h1 className="tit_logo"><a href="http://www.wematch.com/" className="link_logo"><span className="img_logo">위매치</span></a></h1>
                    <div id="wmServices">
                        <ul className="list_services">
                            <li><a href={constants.MOVE_URL}>이사</a></li>
                            <li><a href={constants.CLEAN_URL}>청소</a></li>
                            {/*<li><a href={constants.INTERIOR_URL}>인테리어</a></li>*/}
                        </ul>
                    </div>
                    <div id="wmLnb">
                        <div className="quick_gnb">
                            {/*<a href="https://wematch.com/service_search.html" className="link_find">서비스찾기</a>*/}
                            <a href="https://wematch.com/inquiry" className="link_report">내 신청내역 확인</a>
                        </div>
                        <div className="head_info">
                            <a href="https://wematch.com/partner_gate.html" className="link_partner">파트너 가입</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHeader
