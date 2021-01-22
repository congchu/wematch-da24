import React from 'react'
import {useMedia} from 'react-use-media'
import styled from 'styled-components'

import Skeleton from './skeleton'
import CompletedSkeleton from './completedSkeleton'
import CompletedSkeletonTablet from './completedSkeletonTablet'
import CompletedSkeletonPC from './completedSkeletonPC'


export default function ResponsiveSkeleton() {

    const isDesktop = useMedia({
        minWidth: 1200,
    })
    const isTablet = useMedia({
        minWidth: 760,
    })

    //skeleton 실행되면 스크롤 상단으로 올리기
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

    return (
        <>
            {isDesktop ? <CompletedSkeletonPC/> :
                isTablet ? <CompletedSkeletonTablet/> :
                    <CompletedSkeleton/>
            }
        </>
    )
}