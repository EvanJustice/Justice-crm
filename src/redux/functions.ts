
export const dateCorrector = (a: number) => {
    if(a<10){
        return '0' + a
    } else {
        return a
    }
}

export const productDate = (t = new Date()):string => {
    const y = t.getFullYear();
    const m = dateCorrector(t.getMonth() + 1);
    const d = dateCorrector(t.getDate())
    return `${d}.${m}.${y}`
}
export const fixDataValue = (d:string) => {
    const year = d?.slice(0,4)
    const month = d?.slice(5,7)
    const day = d?.slice(8,10)
    return `${day}.${month}.${year}`
}
