export interface CardInfo {
    id: number
    fatherID: number
    name: string
    path: string
    stars: number
    scoreHistogram: number[]
    isHidden : boolean,
    isNew: boolean,
    isFood : boolean,
    image : string
}