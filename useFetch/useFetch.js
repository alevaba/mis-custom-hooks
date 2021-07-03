import { useState, useEffect, useRef  } from "react"
import fetch from 'cross-fetch'
export const useFetch = ( url) => {
    // useRef se usa también para guardar referencia a variables u objetos a parte de elementos html
    // esta referencia es persistente para todo el tiempo de vida del componente
    const isMounted = useRef(true);
    const [state , setState] = useState(
            { data:null , loading: true , error: null}
    );

    // useEffect no hace nada al cargarse el componente por 1era vez
    // pero sí cambia de estado la referencia cuando es desmontado lo pone en false
    useEffect( ()=>{
        return () => {
            isMounted.current = false;
        }
    }
    ,[]);       

    useEffect( () => {
        setState( { data: null , loading: true , error:null});

        fetch(url)
            .then(resp => resp.json())
            .then(data => {     
                // prevenir que se ejecute setState cuando esté desmontado
                    if (isMounted.current)    {
                        setState({
                            loading: false,
                            error: null,
                            data
                        });
                    }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error:'No se pudo cargar la info'
                })
            })
    },[ url ]);

    return state;

}
