export const validation = (element) => {
  let error = [true, ""];

  if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message =`${!valid ? "Must be valid email" : ""}`;
        error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;

    error = !valid ? [valid, message] : error;
  }
  return error;
};
