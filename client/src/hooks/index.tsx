
import React, { useState } from 'react'

const createPromise = () => {
    let resolver;
    return [ new Promise(( resolve, reject ) => {

        resolver = resolve
    }), resolver]
}

const useConfirm = () => {
    
  const [ open, setOpen ] = useState(false);
  const [ resolver, setResolver ] = useState<any>({ resolver: undefined })
  const [ label, setLabel ] = useState('')
  
  const getConfirmation = async (text:string) => {
        setLabel(text);
        setOpen(true);
        const [ promise, resolve ] = await createPromise()
        setResolver({ resolve })
        return promise;
  }

  const onClick = async(status: boolean) => {
        setOpen(false);
        resolver.resolve(status)
  }

  const Confirmation = () => (
      <div className={open ? "modal is-active is-clipped" : "modal"}>
        <div className="modal-background"></div>
            <div className="modal-content" style={{background: "rgba(200,200,200,.4)", padding: "100px"}}>
              {label}
          </div>
          <div>
              <div className="button" onClick={ () => onClick(false)}> Cancel </div>
              <div className="button" onClick={ () => onClick(true)}> OK </div>
          </div>
      </div>
  )

    return [ getConfirmation, Confirmation ]
    
}

export default useConfirm;