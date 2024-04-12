
/**
 * Email => Email format validation
 */
export const emailRegExp = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);

/**
 * Password => must include at least one special character: @!$&%-_, one number, one capital letter, one lowercase letter and between 8 and 12 characters
 */
export const passwordRegExp = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_@!$&-]).{8,12}$/);

/** 
 * Name => Min length > 3 & max length < 16
*/
export const nameRegExp = RegExp(/^[A-Za-z]{6,15}$/);

/**
 * Function to validate email field
 */
export const EmailFieldValidation = (value:string):boolean => {
    return emailRegExp.test(value)
}

/**
 * Function to validate password field
 */
export const PasswordFieldValidation = (value:string):boolean => {
    return passwordRegExp.test(value)
}

/**
 * Function to validate name field
 */
export const NameFieldValidation = (value:string):boolean => {
    return nameRegExp.test(value)
}
