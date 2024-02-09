import React, { useEffect, useRef } from 'react'

const useOutSideClick = (handleEvent , listenCapturing = true) => {
    const ref = useRef()

  useEffect(()=>{
    
    const handleClick = (e) => {
        if(ref.current && !ref.current.contains(e.target))
        handleEvent()
    }
    
    document.addEventListener("click" , handleClick , listenCapturing)
    
    return ()=>document.removeEventListener("click" , handleClick , listenCapturing)
    
  },[handleEvent])

  return ref
}

export default useOutSideClick