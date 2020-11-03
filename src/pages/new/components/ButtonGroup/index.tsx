import React, { useRef } from 'react'
import Styled, { css } from 'styled-components'
import { Next } from 'components/wematch-ui/Icon'
import { useMedia } from 'react-use-media'

import * as colors from 'styles/colors'
import { useSelector } from 'react-redux'
import * as formSelector from 'store/form/selectors'

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
    headerRef?: React.RefObject<HTMLDivElement>;
    isFixed?: boolean;
    setIsFixed?: React.Dispatch<boolean>;
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
        //box-shadow: 0 4px 10px 4px rgba(0, 104, 255, 0.1);
        background-color: white;
        height: 64px;

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
        font-size: 16px;
        font-weight: bold;
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
        headerRef,
        isFixed,
        setIsFixed,
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

    const isDesktop = useMedia({
        minWidth: 1200,
    })

    const scrollToButton = () => {
        // 페이지 가장 Top 절대값을 구한다.
        const containerTop = window.pageYOffset + (headerRef?.current?.getBoundingClientRect().top || 0)
        // 버튼 그룹의 Top 절대값을 구한다.
        const buttonGroupTop = window.pageYOffset + (buttonRef?.current?.getBoundingClientRect().top || 0)

        // 스크롤을 아래서 위로 올릴 경우 헤더의가 Fixed 로 바뀐다 그래서 헤더의 값을 더해줘야 한다. (ref로 가져왔으면 더 좋았을듯)
        const HEADER_HEIGHT = 72
        // 간격 약간 위로
        const TOP_PADDING = 20

        let scrollPosition = containerTop + buttonGroupTop - TOP_PADDING

        if (isFixed && isDesktop) {
            scrollPosition = scrollPosition + HEADER_HEIGHT
        }

        // 헤더 무조건 접는다.
        if (setIsFixed) {
            setIsFixed(false)
        }

        if (scrollPosition !== window.pageYOffset) {
            window.scroll({
                top: scrollPosition,
                behavior: 'smooth'
            });
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
