import {assert} from "./Asserts";
import {separateKeyValue, toKeyValueString} from "../main/util";

assert(toKeyValueString("myKey", "myValue"), "myKey=myValue");
let keyValues = separateKeyValue("myKey=myValue");
assert(keyValues[0], "myKey")
assert(keyValues[1], "myValue")
