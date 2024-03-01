import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"

export function useSearch () {
    const [search, setSearch] = useState('')
    const [error, setError] = useState (null)
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current)   {
            isFirstInput.current = search === ''
            return
        }

      if (search === '') {
        setError('No se puede buscar vacio')
        return
      }
  
      //if (search.length < 3) {
      //  setError ('La bésqueda debe ser mayor a tres caracteres')
      //  return
      //}
  
      setError(null)
      // y más errores
    }, [search])
  
    return {search, setSearch, error}
    
  }