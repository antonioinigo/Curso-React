import styles from './App.module.css'
import Alert from './components/Alert/Alert'
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'


function App() {
  
  const {weather, fetchWeather,hasWeatherData, loading, notFound } = useWeather()

  return (
    <>
     <p className={styles.title}>Buscador de Clima</p>
     <div className={styles.container}>
      <Form
        fetchWeather={fetchWeather}
      />
      {loading && 
        <Spinner 
        />
      }
      {hasWeatherData &&
        <WeatherDetail
          weather={weather}
        />
      }
      {notFound &&
       <Alert>Ciudad No Encontrada</Alert>
      }
     
     </div>
    </>
  )
}

export default App
