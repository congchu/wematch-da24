import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../styles/colors'

import { IconSad } from '../Icon'

const S = {
	Container: Styled.div`
		padding:110px 0 40px;
		text-align:center;
		letter-spacing:-0.5px;
		@media screen and (max-width: 320px) {
			padding-top:70px;
		}
		svg{
			display:block;
			margin:0 auto;
		}
		strong{
			display:block;
			margin-top:47px;
			font-size:16px;
			color:${colors.black};
			@media screen and (max-width: 320px) {
				margin-top:37px;
			}
		}
		p{
			margin-top:8px;
			font-size:14px;
			color:${colors.gray66};
		}
	`,

}

const EmptyPage = ({ title, subtitle }) => {
	return (
		<S.Container>
			<IconSad width="80" height="64"/>
			<strong>{title}</strong>
			<p>{subtitle}</p>
		</S.Container>
	)
}

export default EmptyPage
