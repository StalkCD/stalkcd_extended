export enum FailedComparisonReason {
    UNEQUAL_AMOUNT_OF_KEYS = "UNEQUAL_AMOUNT_OF_KEYS",
    NOT_SAME_ELEMENT_TYPE = "NOT_SAME_ELEMENT_TYPE",
    UNEQUAL_STRING = "UNEQUAL_STRING",
    UNEQUAL_BOOLEAN = "UNEQUAL_BOOLEAN",
    UNEQUAL_NUMBER = "UNEQUAL_NUMBER",
    UNEQUAL_UNKNOWN_TYPE = "UNEQUAL_UNKNOWN_TYPE",
}

export class Comparator {

    /**
     * The
     * @param expected - expected object, this is the truth so to say.
     * @param actual - the actual object, it is the object which has to hold true to the expected.
     */
    public static compareObjects(expected: object, actual: object) {
        let map = new Map<string, string[]>();
        for (let reason in FailedComparisonReason) {
            map.set(reason, []);
        }
        this.compareObjectsInternal(expected, actual, "expected", map);
    }

    private static compareObjectsInternal(expected: any, actual: any, context: string, errors: Map<string, string[]>) {
        let expectedKeys: string[] = Object.keys(expected);
        if (expectedKeys.length !== Object.keys(actual).length) {
            this.error(FailedComparisonReason.UNEQUAL_AMOUNT_OF_KEYS, context);
        }
        for (let key of expectedKeys) {
            let expectedElement: any = expected[key];
            let actualElement: any = actual[key];
            if (typeof expectedElement !== typeof actualElement) {
                this.error(FailedComparisonReason.NOT_SAME_ELEMENT_TYPE, Comparator.key(context, key));
                continue;
            }
            console.log("Expected: " + Comparator.key(context, key) + " = " + expectedElement);
            console.log("Actual: " + Comparator.key(context, key) + " = " + actualElement);
            console.log();
            switch (typeof expectedElement) {
                case "string":
                    expectedElement === actualElement ? "" : this.error(FailedComparisonReason.UNEQUAL_STRING, Comparator.key(context, key));
                    break;
                case "boolean":
                    expectedElement === actualElement ? "" : this.error(FailedComparisonReason.UNEQUAL_BOOLEAN, Comparator.key(context, key));
                    break;
                case "number":
                    expectedElement === actualElement ? "" : this.error(FailedComparisonReason.UNEQUAL_NUMBER, Comparator.key(context, key));
                    break;
                case "object":
                    this.compareObjectsInternal(expectedElement, actualElement, Comparator.key(context, key));
                    break;
                case "function":
                    // funtions are intetionally ignored
                    break;
                default:
                    expectedElement === actualElement ? "" : this.error(FailedComparisonReason.UNEQUAL_UNKNOWN_TYPE, Comparator.key(context, key));
            }
        }
        return
    }

    /**
     * only give reasons which are given in the Enum FailedComparisonReason
     * @param reason an enum FailedComparisonReason
     * @param context current context of the error
     * @param errors the list of errors given my the enum and their respective reasons why they failed.
     * @private
     */
    private static error(reason: string, context: string, errors: Map<string, string[]>): void {
        // @ts-ignore --> only an enum type shall be given, these are initialized in the constructor
        errors.get(reason).push(context);
    }

    private static key(context: string, key: string): string {
        return context + "[" + key + "]";
    }

}



