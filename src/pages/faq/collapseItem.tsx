import React from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    category?: string;
    title?: string;
    expand: boolean;
}

const Container = styled.div<{expand: boolean}>`
    display: ${props => props.expand ? 'block' : 'none'};
    border-bottom: 1px solid #EBEEF2;
`
export default function CollapseItem({ category ,title, expand, children }: Props) {
    return (

            <Container expand={expand}>
                {children}
            </Container>

    )
}

