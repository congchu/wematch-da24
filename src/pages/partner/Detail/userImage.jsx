import React from 'react'
import Styled, { css } from 'styled-components'

import * as colors from '../../../styles/colors'

const S = {
	WrapImg: Styled.div``,
	ProfileImg: Styled.div`
		span{
			display:inline-block;
			width:100%;
			height:228px;
			background-image:url('https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/bg/m/bg_happymove.png');
			background-size:100%;
			background-repeat:no-repeat;
		}
	`,

}

const UserImage = () => {
	return (
		<S.WrapImg>
			<S.ProfileImg>
				<span></span>
			</S.ProfileImg>
		</S.WrapImg>
	)
}

export default UserImage