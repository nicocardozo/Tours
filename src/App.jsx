import { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

const App = () => {
  const [isLoading, setIsloading] = useState(true)
  const [tours, setTours] = useState([])

  const removeTour = id => {
    const newTours = tours.filter(tour => tour.id !== id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    setIsloading(true)

    try {
      const response = await fetch(url)
      const tours = await response.json()
      setTours(tours)
      console.log(tours)
    } catch (error) {
      console.log(error)
    }

    setIsloading(false)
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (isLoading) {
    return (
      <main className="main">
        <Loading />
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button type="button" className="btn" style={{ marginTop: '2rem' }} onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}
export default App
