 
const validateSignForm = (errors , signModel) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    signModel.email.length == 0 &&  (valid = false);
    signModel.password.length == 0 &&  (valid = false);
    signModel.confirmPassword && signModel.confirmPassword.length == 0 &&  (valid = false); 
    return valid;
  };

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  export {validateSignForm , validEmailRegex}