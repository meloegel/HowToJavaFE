import * as yup from "yup";

const howtoSchema = yup.object().shape({
  name: yup.string().trim().required("Please enter the name of the Howto"),
  description: yup
    .string()
    .trim()
    .required("Please enter a description of your Howto"),
  category: yup
    .string()
    .trim()
    .required("Please enter the category of the Howto"),
  complexity: yup.string().trim(),
});

export default howtoSchema;
