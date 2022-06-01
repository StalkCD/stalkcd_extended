import {separateKeyValue, toKeyValueString} from "../main/model/util/Utils";
import {assert} from "./Asserts";

assert(toKeyValueString("myKey", "myValue"), "myKey=myValue");
let keyValues = separateKeyValue("myKey=myValue");
assert(keyValues[0], "myKey")
assert(keyValues[1], "myValue")
