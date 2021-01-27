import React, {useEffect} from 'react'
import {useMedia} from 'react-use-media'
import styled from 'styled-components'

import Skeleton from './skeleton'
import MainHeader from "../MainHeader";

/*
* Abbr. for styling
*   Desk  : Desktop / PC
*   Tab   : Tablet
*   Mob   : Mobile
 */
const Desk = {
    Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 70px 233px;
  `,
    Group: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 32px;
  `,
    Line: styled.div`
    width: 100%;
    border-bottom: 1px solid #C4C9D1;
  `
}

const Tab = {
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

function SkeletonType2Desktop() {
    return (
        <>
            <div style={{ display: 'flex', marginTop: 20 }}>
                <Skeleton style={{ width: 56, height: 56, borderRadius: '50%' }} animated />
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: 10  }}>
                    <Skeleton style={{ width: 240, height: 20 }} animated />
                    <Skeleton style={{ width: 654, height: 14, marginTop: 10 }} animated />
                </div>
            </div>
            <Skeleton style={{ width: 721, height: 40, borderRadius: 6, marginTop: 20 }} animated />
        </>
    )
}

function SkeletonType2Tab() {
    return (
        <>
            <div style={{ display: 'flex', marginTop: 30 }}>
                <Skeleton style={{ width: 56, height: 56, borderRadius: '50%' }} animated />
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: 10  }}>
                    <Skeleton style={{ width: 240, height: 20 }} animated />
                    <Skeleton style={{ width: 654, height: 14, marginTop: 10 }} animated />
                </div>
            </div>
            <Skeleton style={{ width: 721, height: 40, borderRadius: 6, marginTop: 20 }} animated />
        </>
    )
}

function SkeletonType2Mob() {
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


export default function ResponsiveSkeleton() {

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
                    <Skeleton style={{ width: 56, height: 56, borderRadius: '50%' }} animated />
                    <Skeleton style={{ width: 140, height: 24, marginTop: 10 }} animated />
                    <Skeleton style={{ width: 340, height: 14, marginTop: 14 }} animated />
                    <Desk.Group>
                        <Skeleton style={{ width: 160, height: 20 }} animated />
                        <Skeleton style={{ width: 120, height: 14 }} animated />
                    </Desk.Group>
                    <Desk.Line style={{ marginTop: 17 }} />
                    <SkeletonType2Desktop />
                    <SkeletonType2Desktop />
                    <SkeletonType2Desktop />
                    <Skeleton style={{ width: 160, height: 20, marginTop: 60, alignSelf: 'flex-start' }} animated />
                    <Desk.Line style={{ marginTop: 18 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                        <Skeleton style={{ width: 640, height: 14, marginTop: 24 }} animated />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                        <Skeleton style={{ width: 640, height: 14, marginTop: 24 }} animated />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                        <div style={{ width: 640 }}>
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 24 }} animated />
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 8 }} animated />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                        <div style={{ width: 640 }}>
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 24 }} animated />
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 8 }} animated />
                        </div>
                    </div>
                    <Desk.Line style={{ marginTop: 24 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                        <div style={{ width: 640 }}>
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 24 }} animated />
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 10 }} animated />
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 10 }} animated />
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 10 }} animated />
                        </div>
                    </div>
                    <Desk.Line style={{ marginTop: 24 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 24 }} animated />
                        <div style={{ width: 640 }}>
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 24 }} animated />
                            <Skeleton style={{ width: '100%', height: 14, marginTop: 10 }} animated />
                        </div>
                    </div>
                </Desk.Container>
            </>
        )
    }

    /* TABLET */
    if (isTablet) {
        return (
            <Tab.Container>
                <Skeleton style={{ width: 56, height: 56, borderRadius: '50%' }} animated />
                <Skeleton style={{ width: 140, height: 24, marginTop: 10 }} animated />
                <Skeleton style={{ width: 340, height: 14, marginTop: 10 }} animated />
                <Tab.Group>
                    <Skeleton style={{ width: 160, height: 20 }} animated />
                    <Skeleton style={{ width: 120, height: 14 }} animated />
                </Tab.Group>
                <Tab.Line style={{ marginTop: 17 }} />
                <SkeletonType2Tab />
                <SkeletonType2Tab />
                <SkeletonType2Tab />
                <Skeleton style={{ width: 160, height: 20, marginTop: 60, alignSelf: 'flex-start' }} animated />
                <Tab.Line style={{ marginTop: 18 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                    <Skeleton style={{ width: 640, height: 14, marginTop: 24 }} animated />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                    <Skeleton style={{ width: 640, height: 14, marginTop: 24 }} animated />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                    <div style={{ width: 640 }}>
                        <Skeleton style={{ width: '100%', height: 14, marginTop: 24 }} animated />
                        <Skeleton style={{ width: '100%', height: 14, marginTop: 8 }} animated />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                    <div style={{ width: 640 }}>
                        <Skeleton style={{ width: '100%', height: 14, marginTop: 24 }} animated />
                        <Skeleton style={{ width: '100%', height: 14, marginTop: 8 }} animated />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton style={{ width: 60, height: 14, marginTop: 24, marginRight: 20 }} animated />
                    <div style={{ width: 640 }}>
                        <Skeleton style={{ width: '100%', height: 14, marginTop: 24 }} animated />
                        <Skeleton style={{ width: '100%', height: 14, marginTop: 8 }} animated />
                        <Skeleton style={{ width: '100%', height: 14, marginTop: 8 }} animated />
                    </div>
                </div>
            </Tab.Container>
        )
    }

    /* MOBILE */
    return (
        <Mob.Container>
            <Skeleton style={{width: 56, height: 56, borderRadius: '50%'}} animated/>
            <Skeleton style={{width: 140, height: 24, marginTop: 10}} animated/>
            <Skeleton style={{width: 140, height: 14, marginTop: 14}} animated/>
            <Skeleton style={{width: 240, height: 14, marginTop: 10}} animated/>
            <Mob.Group>
                <Skeleton style={{width: 80, height: 20}} animated/>
                <Skeleton style={{width: 120, height: 14}} animated/>
            </Mob.Group>
            <Mob.Line style={{marginTop: 17}}/>
            <SkeletonType2Mob/>
            <SkeletonType2Mob/>
            <SkeletonType2Mob/>
            <Skeleton style={{width: 80, height: 20, marginTop: 49, alignSelf: 'flex-start'}} animated/>
            <Mob.Line style={{marginTop: 18}}/>
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
            <Mob.Line style={{marginTop: 24}}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton style={{width: 60, height: 14, marginTop: 24, marginRight: 20}} animated/>
                <div style={{width: 232}}>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 24}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                </div>
            </div>
            <Mob.Line style={{marginTop: 24}}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton style={{width: 60, height: 14, marginTop: 24, marginRight: 20}} animated/>
                <div style={{width: 232}}>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 24}} animated/>
                    <Skeleton style={{width: '100%', height: 14, marginTop: 8}} animated/>
                </div>
            </div>
        </Mob.Container>
    )

}
