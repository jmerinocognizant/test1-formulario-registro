import React from 'react'

type AlertArgs = {
    onCloseAlert: () => void
}


export const AlertDismissButton = ({onCloseAlert}: AlertArgs) => {

  return (
    
    <div className="alert alert-success alert-dismissible mt-2" role="alert" onClick={onCloseAlert}>
        Submit successful
        <button type="button" className="btn-close" data-dismiss="alert" aria-label="btn-close"></button>
    </div>

  )
}
