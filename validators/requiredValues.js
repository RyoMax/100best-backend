import { check } from "express-validator"

const requiredValues = (props) => {
    return props.map(prop => {
        if (prop === "reviews" || prop === "editedBy") {
            return (
                check(prop)
                    .notEmpty()
                    .withMessage(`Please insert a ${prop}!`)
            )
        }
        return (
            check(prop)
                .notEmpty().trim().escape()
                .withMessage(`Please insert a ${prop}!`)
        )
    })
}

export default requiredValues;