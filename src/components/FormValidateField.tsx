import { ErrorMessage } from "./ErrorMessage"

export type ErrorArgs = {
    name: string,
    type: string,
    value: string,
    imgClassName: string,
    placeholder: string,
    onInputChange: (event:React.ChangeEvent<HTMLInputElement>)=>void,
    error: boolean,
    helperText: string | null,
    inputProps?: {},
}

export const FormValidateField = ({name,type,value,imgClassName,placeholder,onInputChange,error,helperText,inputProps}:ErrorArgs) => {

  return (
    <>
        <div className="input-group mt-2">
        
        <span className="input-group-text text-white bg-primary" >
          <i className={`${imgClassName} fs-5`} />
        </span>

        <input 
          id = {name}
          name = {name}
          type = {type} 
          className = 'form-control' 
          placeholder = {placeholder}
          value = { value } 
          onChange={onInputChange}
          {...inputProps}
          >
          
        </input>
      </div>
      
      {
        //onChange={ onInputChange }
       error && <ErrorMessage message={helperText?helperText:''} />
      }

    </>
  )
}
