import React from "react";
import Styled from "styled-components";

import { Level } from "types/partner";

const S = {
  Container: Styled.div``
};

interface Props {
  level: Level;
}

const LevelIcon = ({ level }: Props) => {
  return (
    <S.Container>
      <img src={require(`../../assets/images/level_${level}.svg`)} alt={level} />
    </S.Container>
  );
};

export default LevelIcon;
