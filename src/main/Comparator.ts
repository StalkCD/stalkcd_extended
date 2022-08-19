enum FailedComparisonReason {
    UNEQUAL_AMOUNT_OF_KEYS = "UNEQUAL_AMOUNT_OF_KEYS",
    NOT_SAME_ELEMENT_TYPE = "NOT_SAME_ELEMENT_TYPE",
    UNEQUAL_STRING = "UNEQUAL_STRING",
    UNEQUAL_BOOLEAN = "UNEQUAL_BOOLEAN",
    UNEQUAL_NUMBER = "UNEQUAL_NUMBER",
    UNEQUAL_UNKNOWN_TYPE = "UNEQUAL_UNKNOWN_TYPE",
}

export class Comparator {

    /**
     * This will compare two objects deeply and provide a map of the occurred differences.
     * @param expected - expected object, this is the truth so to say.
     * @param actual - the actual object, it is the object which has to hold true to the expected.
     */
    public static compareObjects(expected: object, actual: object): Map<string, string[]> {
        // initialize error Map
        let map = new Map<string, string[]>();
        for (let reason in FailedComparisonReason) {
            map.set(reason, []);
        }

        // do comparison
        this.internalCompareObjects(expected, actual, "obj", map);

        // filter empty entries
        let resultMap = new Map<string, string[]>()
        map.forEach((value, key) => {
            if (value.length > 0) {
                resultMap.set(key, value);
            }
        })
        return resultMap;
    }

    private static internalCompareObjects(expected: any, actual: any, context: string, errors: Map<string, string[]>): Map<string, string[]> {
        let expectedKeys: string[] = Object.keys(expected);
        if (expectedKeys.length !== Object.keys(actual).length) {
            this.error(errors, FailedComparisonReason.UNEQUAL_AMOUNT_OF_KEYS, context);
        }
        for (let key of expectedKeys) {
            let expectedElement: any = expected[key];
            let actualElement: any = actual[key];
            let current_context: string = context + "[" + key + "]";
            if (typeof expectedElement !== typeof actualElement) {
                this.error(errors, FailedComparisonReason.NOT_SAME_ELEMENT_TYPE, current_context + " type: " + typeof expectedElement + " --> actual: " + typeof actualElement);
                continue;
            }
            // console.log("Expected: " + current_context + " = " + expectedElement);
            // console.log("Actual: " + current_context + " = " + actualElement);
            // console.log();
            let contextErrorString: string = current_context + " = " + expectedElement + " --> actual = " + actualElement
            switch (typeof expectedElement) {
                case "string":
                    expectedElement === actualElement ? "" : this.error(errors, FailedComparisonReason.UNEQUAL_STRING, contextErrorString);
                    break;
                case "boolean":
                    expectedElement === actualElement ? "" : this.error(errors, FailedComparisonReason.UNEQUAL_BOOLEAN, contextErrorString);
                    break;
                case "number":
                    expectedElement === actualElement ? "" : this.error(errors, FailedComparisonReason.UNEQUAL_NUMBER, contextErrorString);
                    break;
                case "object":
                    this.internalCompareObjects(expectedElement, actualElement, current_context, errors);
                    break;
                case "function":
                    // functions are intentionally ignored
                    break;
                default:
                    expectedElement === actualElement ? "" : this.error(errors, FailedComparisonReason.UNEQUAL_UNKNOWN_TYPE, contextErrorString);
            }
        }
        return errors
    }

    /**
     * only give reasons which are given in the Enum FailedComparisonReason
     * @param errors the list of errors given my the enum and their respective reasons why they failed.
     * @param reason an enum FailedComparisonReason
     * @param context current context of the error
     * @private
     */
    private static error(errors: Map<string, string[]>, reason: string, context: string): void {
        // @ts-ignore --> only an enum type shall be given, these are initialized in the constructor
        errors.get(reason).push(context);
    }
}