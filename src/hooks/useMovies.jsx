import { useCallback, useState } from 'react'
import { searchMovies } from '../service/search'
import { useRef } from 'react'
import { useMemo } from 'react'

export function useMovies ({search, sort}) {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState (false)
    const [error, setError] = useState (null)
    const previousSearch = useRef()
    
    //useCallback y useMemo es igual, solo que la primera es específica para funciones, la segunda se puede usar con las dos
    const getMovies = useCallback (async ({search}) => {
        if (search === previousSearch.current) return

        try {
          setLoading(true)
          setError(null)
          previousSearch.current = search
          const newMovies = await searchMovies({search})
          setMovies(newMovies)
        } catch { 
          setError(e.message)
        } finally {
          setLoading(false)
        }
      }, [])

    
    const sortedMovie = useMemo (() => {
      return sort ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies

    }, [sort, movies]
    ) 


    return { movies: sortedMovie, getMovies, loading }
  }