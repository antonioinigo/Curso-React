export type Country={
    code:string
    name:string
}

export type SeachType={
    city:string
    country:string
}

export type Weather = {
    name: string
    main: {
        temp : number
        temp_max :  number
        temp_min : number
    }
}