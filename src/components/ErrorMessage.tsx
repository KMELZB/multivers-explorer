const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div >
      <p>Error : {message}</p>
    </div>
  );
};

export default ErrorMessage;