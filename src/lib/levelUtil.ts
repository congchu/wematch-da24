export const LevelGradeText = (level:'S' | 'A' | 'B' | 'C' | 'D' | 'NEW') => {
    /*- S등급: 고객평가 상위 10%
    - A등급: 고객평가 상위 38%
    - B등급: 평균 수준
    - C등급: 평균 수준
    - N등급: 평균 이상 수준*/
    switch (level) {
        case 'S':
            return '고객평가 상위 10%'
        case "A":
            return '고객평가 상위 38%'
        case "B":
            return '평균 수준'
        case "C":
            return '평균 수준'
        case "NEW":
            return '평균 이상 수준'
        default:
            return "평균 수준"
    }
}

