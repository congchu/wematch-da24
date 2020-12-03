export const checkIos = () => {
    let isIOS = false
    const platform = navigator.platform
    if (platform === 'iPad' || platform === 'iPhone' || platform === 'iPod') {
        isIOS = true
    }
    return isIOS
}

export const checkMobile = () => {
    const regExps = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ]

    return regExps.some((reg) => {
        return navigator.userAgent.match(reg)
    })
}

export const checkApp = () => {
    let isApp = false
    const platform = navigator.platform
    if (platform === 'iPad' || platform === 'iPhone' || platform === 'iPod' || platform === 'Android') {
        isApp = true
    }

    return isApp
}
