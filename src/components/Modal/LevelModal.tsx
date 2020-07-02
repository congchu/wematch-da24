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
            width: 33%;
        }
    `,
    Box: Styled.div`
        border: solid 1px ${colors.lineDefault};
        border-radius: 8px;
        background-color: ${colors.lineDeco};
        margin-top: 20px;
        padding: 16px 12px;
        
        ul {
           font-size: 12px;
           line-height: 1.67;
           letter-spacing: -1px;
           color: ${colors.gray66};
        }
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
                    <em>수십만 위매치 이용자들의 피드백</em><br />
                    업체 평가의 기준을 정했습니다.
                </S.Text>
                <S.Text>
                    <em>해당 업체와 이사한 고객들의 평가를 수집 후,</em>을 통해 <br />
                    빅데이터로 분석해 등급과 만족확률을 <br />
                    산출했습니다. <br />
                </S.Text>
                <S.Text>
                    <em>등급을 통해 해당 업체의 서비스 수준이</em><br />
                    전체 이사업체 중 어느 정도인지 <br />
                    쉽게 알 수 있습니다. <br />
                </S.Text>
                <S.Table>
                    <thead>
                        <tr>
                            <th>등급</th>
                            <th>만족 확률</th>
                            <th>시장상위</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>S</td>
                            <td>84%</td>
                            <td>상위 10%</td>
                        </tr>
                        <tr>
                            <td>A</td>
                            <td>73%</td>
                            <td>상위 38%</td>
                        </tr>
                        <tr>
                            <td>B</td>
                            <td>65%</td>
                            <td>평균수준</td>
                        </tr>
                        <tr>
                            <td>C</td>
                            <td>51%</td>
                            <td>평균수준</td>
                        </tr>
                        <tr>
                            <td>등급 산정 중</td>
                            <td>74%</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </S.Table>
                <S.Box>
                    <ul>
                        <li>- 위매치다이사 빅데이터 제공 (2018년 4월 기준-최근 1년)</li>
                        <li>- 최근 1년간의 평가로 등급 산출</li>
                        <li>- 매월 1일 갱신</li>
                    </ul>
                </S.Box>
            </S.Container>
        </ModalTemplate>
    )
}

export default LevelModal