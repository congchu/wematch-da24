import * as React from "react";
import styled from "styled-components";
import { parseYoutubeId, isYoutubeLink } from "../utils/youtube";

interface Props extends React.HTMLAttributes<HTMLElement> {
  urls?: string[];
}

const S = {
  Container: styled.div`
    margin-left: 1px;
    margin-right: -1px;
    overflow: hidden;
  `,
  Wrap: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -3px;
    & > div {
      margin: 0 3px;
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: 8px;
      position: relative;
      display: inline-block;
      width: 100px;
      height: 72px;
      box-sizing: border-box;
    }
  `,
  Preview: styled.div<{ img: string }>`
    background-image: url(${({ img }) => img});
    background-size: cover;
    background-position: center center;
  `
};

export function ImagePreviewer(props: Props) {
  const { urls = [], ...restProps } = props;

  const previews = urls.map((url) => {
    if (isYoutubeLink(url)) {
      const id = parseYoutubeId(url);
      return `http://img.youtube.com/vi/${id}/0.jpg`;
    }
    return url;
  });

  return (
    <S.Container>
      <S.Wrap {...restProps}>
        {previews.map((i) => {
          return <S.Preview key={i} img={i} />;
        })}
      </S.Wrap>
    </S.Container>
  );
}
