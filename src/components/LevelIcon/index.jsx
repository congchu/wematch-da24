import React from 'react'
import Styled from 'styled-components'

const S = {
	Container: Styled.div``,
}

const LevelIcon = ({level}) => {
	return (
		<S.Container>
			<img src={require(`../../assets/images/level_${level}.svg`)} alt={level} />
		</S.Container>
	)
}

export default LevelIcon
