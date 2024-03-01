import { useEffect, useState } from 'react'
import './App.css'
import { Movies } from './componets/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'


function App() {
  const [sort, setSort] = useState (false)
  const {search, setSearch, error} = useSearch()
  const { movies, loading, getMovies} = useMovies({search, sort})
  
  
  const debounceGetMovie = useCallback (
    debounce(search => {
      console.log('search y se está renderizando', search)
      getMovies({ search})
    }, 300), [getMovies]
  )
  
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
    //ir a hora 2 del video de midu https://www.youtube.com/watch?v=GOEiMwDJ3lc&list=PLUofhDIg_38q4D0xNWp7FEHOTcZhjWJ29&index=5
  }

  const handleSort = (event) => {
    setSort(!sort)
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovie(newSearch)
    
  }

  useEffect (() => {
    console.log('new getMovies received')
  }, [getMovies])

  return (
    <div className='page'>
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Harry Potter, ...'/>
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        {
          loading ? <p className='cargando'>Cargando...</p> : <Movies movies={movies}/>
        }
        
      </main>
    </div>
    


  )
}

export default App
