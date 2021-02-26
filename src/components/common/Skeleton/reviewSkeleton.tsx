import styled from "styled-components";
import {useMedia} from "react-use-media";
import React, {useEffect} from "react";
import MainHeader from "../MainHeader";
import Skeleton from "./skeleton";


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
      //width: 100%;
    `,
    InnerContainer: styled.div`
      width: 100%;
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
                <Skeleton style={{ width: 720, height: 14, marginTop: 20.28 }} animated />
                <Skeleton style={{ width: 720, height: 14, marginTop: 12 }} animated />
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




export default function ReviewSkeleton() {

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
                <MainHeader/>
                <Desk.Container>
                    <Desk.Header>
                        <div>
                            <Skeleton style={{width: 140, height: 19.49, marginTop: 24, marginLeft: 20}} animated/>
                        </div>
                        <div >
                            <Skeleton style={{width: 140, height: 11.37, marginTop: 11.37, marginLeft: 20, marginBottom: 10}} animated/>
                        </div>
                    </Desk.Header>
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
                <Tab.Header>
                    <div>
                        <Skeleton style={{width: 140, height: 19.49, marginTop: 24, marginLeft: 20}} animated/>
                    </div>
                    <div >
                        <Skeleton style={{width: 140, height: 11.37, marginTop: 11.37, marginLeft: 20, marginBottom: 10}} animated/>
                    </div>
                </Tab.Header>
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
            <Mob.Header>
                <div>
                    <Skeleton style={{width: 140, height: 19.49, marginTop: 24}} animated/>
                </div>
                <div >
                    <Skeleton style={{width: 140, height: 11.37, marginTop: 11.37, marginBottom: 10}} animated/>
                </div>
            </Mob.Header>
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
