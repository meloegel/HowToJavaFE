import * as yup from "yup";

const registrationSchema = 
    yup.object().shape({
        username: yup.string()
            .trim()
            .min(4, "Please enter a valid username")
            .required("Please enter a vlaid username"),
        password: yup.string()
            .trim()
            .min(4,"Please enter your password")
            .required("Please enter your password"),
        passwordConfirm: yup.string()
            .oneOf([yup.ref("password"), null], "passwords must match"),
        email: yup.string()
            .email("Must be a valid email address")
    })


export default registrationSchema;