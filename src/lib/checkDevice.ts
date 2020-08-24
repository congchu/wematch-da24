export const checkIos = () => {
    let isIOS = false
    const platform = navigator.platform
    if (platform === 'iPad' || platform === 'iPhone' || platform === 'iPod') {
        isIOS = true
    }
    return isIOS
}