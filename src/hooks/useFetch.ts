import { useState, useEffect } from 'react'

type FetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (response.ok) {
          const data: T = await response.json()
          setData(data)
        } else {
          throw new Error('An error occurred while fetching data')
        }
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
