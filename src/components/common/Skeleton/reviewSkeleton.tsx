import styled from 'styled-components'
import {useMedia} from 'react-use-media'
import React, {useEffect} from 'react'
import Skeleton from './skeleton'


const Desk = {
    Container: styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 768px;
    `,
    InnerContainer: styled.div`
      display: block;
      float: left;
      margin-left: 20px;
    `,
    Header: styled.div`
      width: 100%;
      float: left;
    `,
    Group: styled.div`
      display: flex;
      justify-content: space-between;
      width: 312px;
      margin-top: 32px;
    `,
    Line: styled.div`
      width: 768px;
      border-bottom: 1px solid #C4C9D1;
    `
}

const Tab = {
    Container: styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 608px;
      @media screen and (min-width: 1200px){
        margin-top: -30px;
      }
    `,
    InnerContainer: styled.div`
      display: block;
      float: left;
      width: 608px;
      //margin-left: 20px;
    `,
    Header: styled.div`
      width: 100%;
      float: left;
      margin-top: 24px;
    `,
    Group: styled.div`
      display: flex;
      justify-content: space-between;
      width: 312px;
      margin-top: 32px;
    `,
    Line: styled.div`
      width: 100%;
      border-bottom: 1px solid #C4C9D1;
    `
}

const Mob = {
    Container: styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
    `,
    InnerContainer: styled.div`
      width: 97%;
      display: block;
      float: left;
      margin-left: 20px;
    `,
    Header: styled.div`
      width: 100%;
      display: block;
      float: left;
      margin-left: 20px;
    `,
    Group: styled.div`
      display: flex;
      justify-content: space-between;
      width: 312px;
      margin-top: 32px;
    `,
    Line: styled.div`
      width: 100%;
      border-bottom: 1px solid #C4C9D1;
    `
}


function SkeletonType2Desktop() {
    return (
        <Desk.InnerContainer>
            <div>
                <Skeleton style={{ width: 204, height: 19, marginTop: 23.71}} animated />
            </div>
            <div>
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
            </div>
            <div style={{ float: 'left', justifyContent: 'space-between'}}>
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
            </div>
            <Skeleton style={{ width: 720, height: 14, marginTop: 20.28 }} animated />
            <Skeleton style={{ width: 720, height: 14, marginTop: 12 }} animated />
        </Desk.InnerContainer>
    )
}

function SkeletonType2Tab() {
    return (
        <Tab.InnerContainer>
            <div>
                <Skeleton style={{ width: 204, height: 19, marginTop: 23.71}} animated />
            </div>
            <div>
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
            </div>
            <div style={{ display: 'block' , float: 'left', justifyContent: 'space-between'}}>
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
            </div>
            <div/>
            <div style={{ float: 'left', justifyContent: 'space-between'}} >
                <Skeleton style={{ width: 608, height: 14, marginTop: 20.28 }} animated />
                <Skeleton style={{ width: 608, height: 14, marginTop: 12 }} animated />
            </div>
        </Tab.InnerContainer>
    )
}

function SkeletonType2Mob() {
    return (
        <Mob.InnerContainer>
            <div>
                <Skeleton style={{ width: 204, height: 19, marginTop: 23.71}} animated />
            </div>
            <div>
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
            </div>
            <div style={{ display: 'block' , float: 'left', justifyContent: 'space-between'}}>
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
                <Skeleton style={{ width: 96, height: 14, marginTop: 12, marginRight: 12 }} animated />
            </div>
            <div/>
            <div>
                <Skeleton style={{ width: '90%', height: 14, marginTop: 20.28 }} animated />
                <Skeleton style={{ width: '90%', height: 14, marginTop: 12 }} animated />
            </div>
        </Mob.InnerContainer>
    )
}

interface Props {
    header?: boolean;
}


export default function ReviewSkeleton( ) {


    /* 스크롤 방지 */
    document.body.style.overflow = "hidden";

    const isDesktop = useMedia({
        minWidth: 1200,
    })
    const isTablet = useMedia({
        minWidth: 760,
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    /* DESKTOP */
    if (isDesktop) {
        return (
            <>
                <Desk.Container>
                    <SkeletonType2Desktop/>
                    <Desk.Line style={{marginTop: 18}}/>
                    <SkeletonType2Desktop/>
                    <Desk.Line style={{marginTop: 18}}/>
                    <SkeletonType2Desktop/>
                    <Desk.Line style={{marginTop: 18}}/>
                    <SkeletonType2Desktop/>
                    <Desk.Line style={{marginTop: 18}}/>
                    <SkeletonType2Desktop/>
                    <Desk.Line style={{marginTop: 18}}/>
                    <SkeletonType2Desktop/>
                    <Desk.Line style={{marginTop: 18}}/>
                    <SkeletonType2Desktop/>
                    <Desk.Line style={{marginTop: 18}}/>
                    <SkeletonType2Desktop/>
                    <Desk.Line style={{marginTop: 18}}/>
                </Desk.Container>
            </>
        )
    }

    /* TABLET */
    if (isTablet) {
        return (
            <Tab.Container>
                <SkeletonType2Tab/>
                <Tab.Line style={{marginTop: 18}}/>
                <SkeletonType2Tab/>
                <Tab.Line style={{marginTop: 18}}/>
                <SkeletonType2Tab/>
                <Tab.Line style={{marginTop: 18}}/>
                <SkeletonType2Tab/>
                <Tab.Line style={{marginTop: 18}}/>
                <SkeletonType2Tab/>
                <Tab.Line style={{marginTop: 18}}/>
            </Tab.Container>
        )
    }

    /* MOBILE */
    return (
        <Mob.Container>
            <SkeletonType2Mob/>
            <Mob.Line style={{marginTop: 18}}/>
            <SkeletonType2Mob/>
            <Mob.Line style={{marginTop: 18}}/>
            <SkeletonType2Mob/>
            <Mob.Line style={{marginTop: 18}}/>
            <SkeletonType2Mob/>
            <Mob.Line style={{marginTop: 18}}/>
            <SkeletonType2Mob/>
        </Mob.Container>
    )

}
