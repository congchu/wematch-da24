import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

const S = {
	Container: Styled.div`
		padding:24px;
	`,
	UserInfo: Styled.div`
		/* overflow:hidden; */
		strong{
			font-size:14px;
		}
		span{
			float:right;
			font-size:14px;
			color:${colors.gray66};
		}
	`,
	Grade: Styled.div`

	`,
}

const Review = () => {
	return (
		<S.Container>
			<S.UserInfo>
				<strong>고객번호 23577</strong>
				<span>27일전 이사</span>
			</S.UserInfo>
			<S.Grade>
				<div>
					<span></span>
				</div>
			</S.Grade>
		</S.Container>
	)
}

export default Review