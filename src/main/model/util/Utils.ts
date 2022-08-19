/**
 * This function checks if a string is a numeric value.
 * This means empty strings or white-spaces are not evaluated as numeric.
 * The value is also checked afterwards for isNaN.
 * @param value a string value which shall be checked if it is numeric.
 * @return boolean
 */
export function isNumberic(value: string): boolean {
    // Please check this article for more information: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    // the instrinsics of JavaScript are rather complex on this topic and do not have a clear cut.
    if (value === undefined) {
        return false
    }
    if (value.length === 0) { // +"" == 0 is not reasonable
        return false
    }
    if (value.match(/\s/g)) { // +" " == 0; and any other whitespace also, so we check for whitespaces and consider this as NaN
        return false
    }
    const converted = +value
    // noinspection RedundantIfStatementJS
    if (isNaN(converted)) {
        return false
    }
    return true;
}

/**
 * removes undefined keys of the given object.
 * Please use with caution, this is inefficient.
 * @param obj
 */
export function removeUndefinedKeys(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}