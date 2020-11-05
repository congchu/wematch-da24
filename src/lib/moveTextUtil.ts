export const getMoveTypeText = (moveType: 'house' | 'oneroom' | 'office' | undefined) => {
    if (moveType === 'house') {
        return '가정'
    } else if (moveType === 'office') {
        return '사무실'
    }
}
