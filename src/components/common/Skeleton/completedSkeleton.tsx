import React from 'react'
import styled from 'styled-components'

import Skeleton from './skeleton'


const S = {
    Container: styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 50px 24px;
    `,
    Group: styled.div`
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 38px;
    `,
    Line: styled.div`
      width: 100%;
      border-bottom: 1px solid #C4C9D1;
    `
}

function SkeletonType2() {
    return (
        <>
            <div style={{display: 'flex', marginTop: 30}}>
                <Skeleton style={{width: 56, height: 56, borderRadius: '50%'}} animated/>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: 10}}>
                    <Skeleton style={{width: 120, height: 20}} animated/>
                    <Skeleton style={{width: 264, height: 14, marginTop: 10}} animated/>
                </div>
            </div>
            <Skeleton style={{width: 312, height: 40, borderRadius: 6, marginTop: 20}} animated/>
        </>
    )
}

export default function CompletedSkeleton() {
    return (
        <S.Container>
            <Skeleton style={{width: 56, height: 56, borderRadius: '50%'}} animated/>
            <Skeleton style={{width: 140, height: 24, marginTop: 10}} animated/>
            <Skeleton style={{width: 140, height: 14, marginTop: 14}} animated/>
            <Skeleton style={{width: 240, height: 14, marginTop: 10}} animated/>
            <S.Group>
                <Skeleton style={{width: 80, height: 20}} animated/>
                <Skeleton style={{width: 120, height: 14}} animated/>
            </S.Group>
            <S.Line style={{marginTop: 17}}/>
            <SkeletonType2/>
            <SkeletonType2/>
            <SkeletonType2/>
            <Skeleton style={{width: 80, height: 20, marginTop: 49, alignSelf: 'flex-start'}} animated/>
            <S.Line style={{marginTop: 18}}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton style={{width: 60, height: 14, marginTop: 24, marginRight: 20}} animated/>
                <Skeleton style={{width: 232, height: 14, marginTop: 24}} animated/>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton style={{width: 60, height: 14, marginTop: 24, marginRight: 20}} animated/>
                <Skeleton style={{width: 232, height: 14, marginTop: 24}} animated/>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton style={{width: 60, height: 14, marginTop: 24, marginRight: 20}} animated/>
                <div style={{width: 232}}>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 24}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                </div>
            </div>
            <S.Line style={{marginTop: 24}}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton style={{width: 60, height: 14, marginTop: 24, marginRight: 20}} animated/>
                <div style={{width: 232}}>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 24}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                </div>
            </div>
            <S.Line style={{marginTop: 24}}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton style={{width: 60, height: 14, marginTop: 24, marginRight: 20}} animated/>
                <div style={{width: 232}}>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 24}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                </div>
            </div>
        </S.Container>
    )
}
