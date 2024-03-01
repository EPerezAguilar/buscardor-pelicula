


function ListOfMovies ({ movie }) {
    return (
        <ul className="movies">
        {
            movie.map( movie => ( 
            <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.poster} alt={movie.title} />
            </li>
            ))
        }
        </ul>
  )}


function NoMovieResulsult () {
    return  (
    <p> No hay resultados, prueba con otro nombre</p>
  )
}

export function Movies ({ movies }) {
     const hasMovies = movies?.length > 0 

    return (
        hasMovies
            ? <ListOfMovies movie={movies} />
            : <NoMovieResulsult/>   
    )
}

   
    