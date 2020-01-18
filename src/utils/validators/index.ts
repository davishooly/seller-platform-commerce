const validate = (fields: any) =>  {
    const fieldErrors = {};
    fields.forEach((field: any) => {
      const [key] = Object.keys(field);
      if(field[`${key}`] === ''){
        fieldErrors[`${key}`] = `please enter your ${key}`
      }
    });
    return fieldErrors;
  };
  
  const hasErrors = (fieldsError: { [x: string]: unknown; }) =>  Object.keys(fieldsError).some(field => fieldsError[field]);
  
  const validateEmail =(email: any) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const validateNameFields = ( name: string, identity: any, setInputError: (arg0: any) => any, error: any, errorField: any) => {
      /[a-zA-Z]/i.test(name) ?
        setInputError({...error, [identity]:'' }):
        setInputError({...error, [identity]:`Please input a valid ${errorField}` })
  };
  
  export { validate, hasErrors, validateEmail, validateNameFields };
  
  
  