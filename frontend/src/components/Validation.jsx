import React from 'react'

const Validation = (values) => {

    const errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    const password_pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const phone_pattern = /^[0-9]{10}$/ 

    if (values.firstName === ""){
        errors.firstName = 'firstName is required!'
    }
    if (values.lastName === ""){
        errors.lastName = 'lastName is required!'
    }

    if (values.email === ""){
        errors.email = 'Email is required!'
    }else if(!email_pattern.test(values.email)){
        errors.email = "Email didn't match"
    }
    if (values.phoneNumber === "") {
        errors.phoneNumber = 'Phone number is required!'
    } else if (!phone_pattern.test(values.phoneNumber)) {
        errors.phoneNumber = "Phone number must be exactly 10 digits."
    }
    if (values.password === ""){
        errors.password = 'password is required!'
    }else if(!password_pattern.test(values.password)){
        errors.password = "The password must be at least 8 characters long, consisting of only letters (uppercase or lowercase) and digits."
    }

  return errors
}
export default Validation