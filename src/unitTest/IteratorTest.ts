import {iterateList, iterateObject, ListAction, ObjectAction} from "../main/model/util/Iterators";
import * as fs from "fs";
import * as yaml from "js-yaml";

function getObjectActions() {
    let objectAction: ObjectAction[] = [];
    let ageAction: ObjectAction = {
        predicate: (tokenName, _) => tokenName === "age",
        nameMapper: (key) => key + "_mapped",
        transformer: (content) => content + 5
    };
    objectAction.push(ageAction)
    return objectAction;
}

function objectActionIteratorTest() {
    const data = yaml.load(fs.readFileSync("testRes/object.yml", { encoding: 'utf8' }));
    let objectAction: ObjectAction[] = getObjectActions();
    let resultObject: any = iterateObject(data, objectAction);
    console.log(resultObject["age_mapped"] === 8 ? "success" : "object failure")
}

function listActionIteratorTest() {
    const data:any = yaml.load(fs.readFileSync("testRes/list.yml", { encoding: 'utf8' }));
    let listAction: ListAction[] = getListActions();
    let result = iterateList(data, listAction);
    console.log(result[0] === "hello mapped" ? "success" : "list failure")
}

function getListActions(): ListAction[] {
    let listAction: ListAction[] = [];
    let helloWorld: ListAction = {
        predicate: (_, item) => item === "hello",
        listItem: (item) => item + " mapped"
    }
    listAction.push(helloWorld);
    return listAction;
}

objectActionIteratorTest();
listActionIteratorTest();
