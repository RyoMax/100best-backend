import { check } from "express-validator";


const loginValidator = () => {
    // First draft - check the user has given a value for their "username"
    return [
        check("username")
            .isEmail().toLowerCase()
            .withMessage("Please insert a valid Email address"),

        check("password")
            .isLength({ min: 6, max: 20 })
            .withMessage("Password must be between 6 and 20 Characters long!")
    ];
}




export default loginValidator;