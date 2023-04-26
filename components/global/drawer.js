import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Drawer({ children, id, triggerId, location, toggleState, setToggleState, hideCloseButton}) {
  const [animateOut, setAnimateOut] = useState(false)
  
  useEffect(() => {
    const content = document.getElementById(id)

    const trapFocus = (e) => {
      if (content.contains(e.relatedTarget)) return
      content.focus()
    }

    if (toggleState) {
      content.focus()
      content.addEventListener('focusout', trapFocus)
    } else {
      content.removeEventListener('focusOut', trapFocus)
      document.getElementById(triggerId).focus()
    }

    if (animateOut === false) return 

    setTimeout(() => {
      setToggleState(false)
      setAnimateOut(false)
    }, 300)
  }, [animateOut, toggleState, id, triggerId, setToggleState])
  
  
  return (
    <div 
      className={`drawer ${toggleState ? 'drawer--open' : ''} ${animateOut ? 'drawer--animate-out' : ''}`}
      role="presentation"
      aria-hidden={!toggleState}
    >
      <div className="drawer__backdrop" onClick={() => setAnimateOut(true)}></div>
      <div className={`drawer__content drawer--${location}`} tabindex="0" id={id}>

        {!hideCloseButton && 
          <div className="text--align-right">
            <button className="app__menu-btn app__menu-btn--cart" onClick={() => setAnimateOut(true)}>
              <Image 
                src={'/images/close.svg'} 
                height={30} 
                width={30} 
                alt="Close Drawer"
              />
            </button>
          </div>        
        }

        {children}
      </div>
    </div>
  )
}