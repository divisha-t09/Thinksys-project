import * as yup from "yup";


export const signUpSchema = yup.object({
    firstName: yup.string("Please enter a valid name").min(2).max(25).nonNullable().required("Please enter your name"),
    employeeId: yup.number().positive().integer().nonNullable().required("PLease enter your employee ID"),
    designation: yup.string().min(2).max(25).nonNullable().required("Please enter your designation"),
    contactNumber: yup.number().positive().integer().nonNullable().required("PLease enter your contact number"),
    email: yup.string().email().nonNullable().required("Please enter your email"),
    companyEmail: yup.string().email().nonNullable().required("Please enter your company email")
});
