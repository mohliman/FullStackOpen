function FormInput({handleFormSubmit,handleInputValue, inputValue}) {
  return (
    <>
        <form onSubmit={handleFormSubmit}>
        <span>find countries: </span>
        <input onChange={handleInputValue} type="text" value={inputValue} />
        </form>
    </>
  )
}

export default FormInput
