import React, {useEffect} from 'react'
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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [window])


    if (isDesktop) {
        return  <CompletedSkeletonPC />
    }

    if (isTablet) {
        return <CompletedSkeletonTablet />
    }

    return <CompletedSkeleton />

}