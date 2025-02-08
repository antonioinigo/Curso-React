import axios from "axios"
import { SeachType } from "../types"
import {  z } from "zod"
import { useMemo, useState } from "react"
// import { object, string, number, Output, parse } from 'valibot'


// TYPE GUARD O ASSERTION
// function isWeatherResponse(weather : unknown) : weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' && 
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number' 
//     )
// } 

// ZOD
const Weather = z.object({

    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

export type Weather = z.infer<typeof Weather>

// Valibot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })
// type Weather = Output<typeof WeatherSchema>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}


function useWeather() {

    const [weather, setWeather] = useState(initialState)
    
    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)


    const fetchWeather= async (search: SeachType)=>{

        const appId=import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
       try{
            
            const geoUrl=`https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            console.log(geoUrl)

            const {data} = await axios.get(geoUrl)
            if (!data[0]) {
                setNotFound(true)
                return
            }
            
            const lat = data[0].lat
            const lon = data[0].lon

             const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

             console.log(weatherUrl)

            // Castear el type
            // const {data: weatherData} = await axios.get<Weather>(weatherUrl) //con los dos puntos de asigna el nombre weatherData al objeto que se recibe de la peticion
            // console.log(weatherResult.temp)
            // console.log(weatherResult.name)

            // Type Guards
            // const {data: weatherResult} = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if(result) {
            //     console.log(weatherResult.name)
            // } else {
            //     console.log('Respuesta mal formada')
            // }

            //ZOD
            const {data: weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            if(result.success) {
                setWeather(result.data)
            }

            // Valibot
            // const {data: weatherResult} = await axios(weatherUrl)
            // const result = parse(WeatherSchema, weatherResult)
            // if(result) {
            //     console.log(result.name)
            // }




       }catch(error){
            console.log(error)
       }finally {
              setLoading(false)
         }

    }

    const hasWeatherData = useMemo(()=> weather.name , [weather])

  return {
    weather,
    fetchWeather,
    hasWeatherData,
    loading,
    notFound
  }
}

export default useWeather
 