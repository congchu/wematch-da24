import React from "react";
import Styled from "styled-components";

import { Next } from "components/wematch-ui/Icon";

import * as colors from "styles/colors";
import * as constants from "constants/env";

interface Props {
  title: string;
}

const S = {
  Container: Styled.div`
        position: relative;
        background-color: ${colors.white};
        letter-spacing: -1px;
        margin-top: 0;
        text-align: left;
        padding: 28px 24px 16px;
        
        @media (min-width: 1200px) {
            padding: 35px 0 20px;
        }
    `,
  Title: Styled.strong`
        display: block;
        margin-bottom: 9px;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -1px;
    `,
  Ul: Styled.ul`
        display: block;
        @media (min-width: 1200px) {
            overflow: hidden;
        }
    `,
  Li: Styled.li`
        overflow: hidden;
        position: relative; 
        border-top: 1px solid ${colors.lineDeco};
        :first-child {
            border-top:0 none;
        }
        :last-child { 
            border-bottom: 1px solid ${colors.lineDeco};
        }
        a {
            display: block;
            position: relative;
            padding: 16px 0 14px; 
            font-size: 16px;
            line-height: 16px;
            letter-spacing: -1px;
            strong {
                display: block;
            }
            
            .txtDirect {
                display: block;
                position: relative;
                margin-top: 12px;
                font-size: 15px;
                color: ${colors.gray66};
            }
            
            .txtBar { 
                :after {
                    position: relative;
                    content: '';
                    top: 0;
                    right: 0;
                    height: 16px;
                    margin: 0 10px 0 14px;
                    border-right: 1px solid ${colors.lineDeco};
                }
            }
        }
        
        svg {
          position: absolute;
          top: 50%;
          right: 20px;
          margin-top: -8px;
          background-position: 0 -380px;
        }
        
        @media (min-width: 1200px) {
            float: left;
            width: 50%;
            border-top: 0 none;
            box-sizing: border-box;
            
            :nth-child (even) {
                padding-left: 4px;    
            }
            :nth-child (odd){
                padding-right: 4px 
            }
            :last-child {
                border-bottom: 0 none;
            }
            
            a {
              padding-top: 24px;
              padding-bottom: 22px;
              border-bottom: 1px solid ${colors.lineDeco};
            }
        }
    `
};

const TipList: React.FC<Props> = (props) => {
  const { title } = props;

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Ul>
        <S.Li>
          <a href={constants.MOVE_URL + "/da24.asp"}>
            <strong>소비자평가등급</strong>
            <span className="txtDirect">빅데이터 기반으로 신뢰할 수 있는 업체 평가등급</span>
            <Next size={16} />
          </a>
        </S.Li>
        <S.Li>
          <a href={constants.MOVE_URL + "/comment2.asp"}>
            <strong>이용자 평가</strong>
            <span className="txtDirect">실제 업체 이용자가 남긴 실시간 직접 평가</span>
            <Next size={16} />
          </a>
        </S.Li>
        <S.Li>
          <a href={constants.MOVE_URL + "/bigdata.asp"}>
            <strong>빅데이터 랩</strong>
            <span className="txtDirect">
              <span className="txtBar">
                이사 거래액
                <span className="num_g"> 3,325 </span>
                <span className="txt_won">억원</span>
              </span>
              <span>
                누적매칭
                <span className="num_g"> 976,856 </span>
                <span className="txt_won">건</span>
              </span>
            </span>
            <Next size={16} />
          </a>
        </S.Li>
        <S.Li>
          <a href={constants.MOVE_URL + "/service.asp"}>
            <strong>서비스 소개</strong>
            <span className="txtDirect">위매치다이사 서비스 소개</span>
            <Next size={16} />
          </a>
        </S.Li>
      </S.Ul>
    </S.Container>
  );
};

export default TipList;
