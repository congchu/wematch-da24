import * as React from "react";
import styled from "styled-components";
import { resetButton } from "styles/mixins";
import { parseYoutubeId } from "../utils/youtube";

interface Props extends React.HTMLAttributes<HTMLElement> {
  youtubeLink: string;
  onRemove?: (event: React.MouseEvent) => void;
}

const S = {
  Preview: styled.div<{ img: string }>`
    background-image: url(${({ img }) => img});
    background-size: cover;
    background-position: center center;
    button {
      ${resetButton}
      position: absolute;
      top: 0;
      right: 0;
    }
  `
};

export function YoutubeUploaderPreview(props: Props) {
  const { youtubeLink, onRemove, ...restProps } = props;

  const youtubeId = parseYoutubeId(youtubeLink);

  const thumbnail = `http://img.youtube.com/vi/${youtubeId}/0.jpg`;

  return (
    <S.Preview img={thumbnail} {...restProps}>
      <button onClick={onRemove}>
        <img src={require("../assets/images/16-sq-default.svg")} />
      </button>
    </S.Preview>
  );
}
