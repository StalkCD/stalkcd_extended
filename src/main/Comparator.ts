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
     * @param specialCasesCallback
     */
    public static compareObjects(expected: object, actual: object, specialCasesCallback: (context: any[], expectedElement: any, actualElement: any) => boolean = () => false): Map<string, string[]> {
        // initialize error Map
        let map = new Map<string, string[]>();
        for (let reason in FailedComparisonReason) {
            map.set(reason, []);
        }

        // do comparison
        this.internalCompareObjects(expected, actual, [], map, specialCasesCallback);

        // filter empty entries
        let resultMap = new Map<string, string[]>()
        map.forEach((value, key) => {
            if (value.length > 0) {
                resultMap.set(key, value);
            }
        })
        return resultMap;
    }

    private static internalCompareObjects(expected: any, actual: any, context: any[], errors: Map<string, string[]>, specialCaseEquality: (context: any[], expectedElement: any, actualElement: any) => boolean): Map<string, string[]> {
        if (specialCaseEquality([...context], expected, actual)) {
            return errors;
        }
        if (expected === null) {
            if (actual !== null) {
                this.error(errors, FailedComparisonReason.NOT_SAME_ELEMENT_TYPE, context + " type: null --> actual: " + typeof actual)
            }
            return errors;
        }
        let expectedKeys: string[] = Object.keys(expected);
        if (expectedKeys.length !== Object.keys(actual).length) {
            this.error(errors, FailedComparisonReason.UNEQUAL_AMOUNT_OF_KEYS, this.contextString(context));
        }
        for (let key of expectedKeys) {
            let expectedElement: any = expected[key];
            let actualElement: any = actual[key];
            let current_context: any[] = [...context, key];
            if (typeof expectedElement !== typeof actualElement) {
                if (!specialCaseEquality([...current_context], expectedElement, actualElement)) {
                    this.error(errors, FailedComparisonReason.NOT_SAME_ELEMENT_TYPE, this.contextString(current_context) + " type: " + typeof expectedElement + " --> actual: " + typeof actualElement);
                    continue;
                }
            }
            // console.log("Expected: " + current_context + " = " + expectedElement);
            // console.log("Actual: " + current_context + " = " + actualElement);
            // console.log();
            let contextErrorString: string = this.contextString(current_context) + " = " + expectedElement + " --> actual = " + actualElement
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
                    this.internalCompareObjects(expectedElement, actualElement, current_context, errors, specialCaseEquality);
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

    private static contextString(context: any[]): string {
        return "obj[" + context.join("][") + "]"
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