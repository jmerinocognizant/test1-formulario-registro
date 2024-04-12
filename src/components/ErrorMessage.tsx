
type ErrorArgs = {
  message: string;
}

export const ErrorMessage = ({message}: ErrorArgs) => {
  return (
    <>
        <div className="alert alert-danger mt-2" role="alert">
            {message}
        </div>
    </>
  )
}

