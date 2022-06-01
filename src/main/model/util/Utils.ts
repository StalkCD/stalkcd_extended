const KEY_VALUE_SEPARATOR = "=";

export function toKeyValueString(key: string, value: string): string {
    return key + KEY_VALUE_SEPARATOR + value.toString();
}

export function separateKeyValue(keyValue: string): string[] {
    let keyValueArray: string[] = keyValue.split(KEY_VALUE_SEPARATOR);
    if (keyValueArray.length > 2) {
        throw Error("Unexpected length of Key-Value-Pair. It seems the separator is contained within the key or value. \nExpected: " + 2 + "\Actual: " + keyValueArray.length)
    }
    return keyValueArray;
}