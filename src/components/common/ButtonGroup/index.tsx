import React, { useState, useRef } from 'react'
import Styled, { css } from 'styled-components'
import { Next } from 'components/wematch-ui/Icon'

import * as colors from 'styles/colors'
import { useSelector } from 'react-redux'
import * as formSelector from '../../../store/form/selectors'

type StyleProps = Pick<Props, 'direction'>

interface GroupProp {
    type: 'house' | 'oneroom' | 'office' | undefined
    value: '가정' | '원룸' | '사무실' | undefined
}

interface Props  {
    /** 버튼을 보여줄 방향 */
    direction?: 'row' | 'column';
    /** 클릭 이벤트 */
    onClick?: (type: 'house' | 'oneroom' | 'office' | undefined) => void;
}

interface buttonProps {
    active: boolean
}
const S = {
    Container: Styled.div<StyleProps>`
        display: flex;
        flex-direction: row;
        border: 1px solid ${colors.pointBlue};
        border-radius: 8px;
        box-shadow: 0 4px 10px 4px rgba(0, 104, 255, 0.1);
        background-color: white;
        height: 72px;

        ${({ direction }) => direction === 'column' && css`
            flex-direction: column;
        `}
        
        button:first-child {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }
        
        button:last-child {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    `,
    Button: Styled.button<buttonProps>`
        flex: 1;
        height: 100%;
        font-size: 18px;
        font-weight: 700;
        color: ${props => props.active ? colors.white : colors.pointBlue};
        background-color: ${props => props.active ? colors.pointBlue: 'transparent'};
        user-select: none;
        padding: 1rem 0;
        cursor: pointer;
        border-right: 1px solid #1672f7;
        
        &:last-child {
            border-right: 0px;
        }
        
        &:last-child {
            border-right: 0px;
        }
        
    `,
}

const ButtonGroup: React.FC<Props> = (props) => {
    const {
        direction = 'row',
        onClick,
        ...restProps
    } = props

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const getMoveType = useSelector(formSelector.getType)


    const groups:GroupProp[] = [
        { type: 'house', value: '가정' },
        { type: 'oneroom', value: '원룸' },
        { type: 'office', value: '사무실' },
    ];

    const scrollToButton = () => {
        const buttonRefTop:number = (buttonRef?.current?.offsetTop || 0) -20;

        if (buttonRefTop !== window.pageYOffset) {
            window.scroll({top: buttonRefTop, behavior: 'smooth'});
        }
    };
    return (
        <S.Container direction={direction} {...restProps}>
            {groups.map((group:GroupProp, idx:number) =>
                <S.Button
                  key={idx}
                  ref={buttonRef}
                  active={group.type === getMoveType}
                  onClick={() => {
                      scrollToButton();
                      if(onClick) {
                          onClick(group.type)
                      }
                  }}
                >
                    {group.value}
                    <Next size={16} color={group.type === getMoveType ? colors.white : colors.pointBlue} />
                </S.Button>
            )}
        </S.Container>
    )
};

export default ButtonGroup;
