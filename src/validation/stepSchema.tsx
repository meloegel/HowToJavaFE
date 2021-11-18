import * as yup from "yup";

const stepSchema = yup.object().shape({
  step: yup.string().trim().required("Please enter the step you wish to add"),
});

export default stepSchema;
