import React from 'react'
import Styled from 'styled-components'

import * as colors from 'styles/colors'

import ModalTemplate from './ModalTemplate'

interface Props {
    visible: boolean;
    /** 닫기 버튼 이벤트 정의 */
    onClose?: () => void;
    /** 오버레이 클릭 시 이벤트 정의 */
    onOverlayClose?: () => void;
}

const S = {
    Container: Styled.div`
        height: 100%;
        font-size: 16px;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -1px;
        margin: 24px;
    `,
    Text: Styled.p`
        color: ${colors.gray33};
        margin-bottom: 10px;
        em {
            font-weight: bold;
            color: ${colors.pointBlue};
        }
    `,
    Table: Styled.table`
        width: 100%;
        text-align: center;
        font-size: 15px;
        margin-top: 25px;
        thead {
            font-weight: bold;
            border-bottom: 1px solid ${colors.gray33};
            th {
              height: 25px;
            }
            tr {
                margin-bottom: 9px;
            }
        }
        tbody {
            line-height: 2.93;
            color: ${colors.gray66};
            tr {
                border-bottom: 1px solid #d8d8d8;
            }
        }
        tr {
            width: 50%;
        }
    `,
    Refresh: Styled.p`
        font-size: 12px;
        line-height: 1.67;
        color: ${colors.gray66};
        text-align: right;
        margin-top: 37px;
    `
}

const LevelModal:React.FC<Props> = (props) => {
    const {
        visible,
        onClose,
        onOverlayClose
    } = props
    return (
        <ModalTemplate visible={visible} title="평가등급이란" onClose={onClose} onOverlayClose={onOverlayClose}>
            <S.Container>
                <S.Text>
                    업체 평가의 기준을 정했습니다. <br />
                    <em>최근 1년간 해당 업체를 이용한 고객의 평가(전문성, 친절도, 가성비)를</em><br />
                    빅데이터로 분석해 산출하는 서비스 등급 입니다.
                </S.Text>
                <S.Table>
                    <thead>
                        <tr>
                            <th>등급</th>
                            <th>만족 확률</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>S</td>
                            <td>84%</td>
                        </tr>
                        <tr>
                            <td>A</td>
                            <td>73%</td>
                        </tr>
                        <tr>
                            <td>B</td>
                            <td>65%</td>
                        </tr>
                        <tr>
                            <td>C</td>
                            <td>51%</td>
                        </tr>
                        <tr>
                            <td>등급 산정 중</td>
                            <td>74%</td>
                        </tr>
                    </tbody>
                </S.Table>
                <S.Refresh>
                    *매월 1일 갱신
                </S.Refresh>
            </S.Container>
        </ModalTemplate>
    )
}

export default LevelModal