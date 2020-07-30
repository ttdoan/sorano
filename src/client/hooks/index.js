import { useRef } from "react";

function useForm(setStatusCb) {
  const form = useRef([]);

  function handleSubmit(callback) {
    let data = {};
    let status = {};
    let hasErrors = false;

    for (let i = 0; i < form.current.length; i++) {
      let input = form.current[i];
      let localErrors = [];

      // Form validation
      if (input.options.required && !input.e.value)
        localErrors.push("This field is required!");

      if (input.options.pattern && !input.options.pattern.test(input.e.value)) {
        localErrors.push(`Please provide a valid ${input.e.name}!`);
      }

      if (localErrors.length) {
        status[input.e.name] = {
          pass: false,
          errors: localErrors,
        };
        hasErrors = true;
      } else status[input.e.name] = { pass: true };

      data[input.e.name] = input.e.value;
    }

    setStatusCb(status);
    if (hasErrors) return;

    callback(data);
  }

  function register(e, options) {
    form.current.push({ e, options });
  }

  return { handleSubmit, register };
}

export { useForm };
