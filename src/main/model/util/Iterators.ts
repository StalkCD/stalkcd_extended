export interface ListAction {
    predicate: (tokenName: String, item: any) => boolean,
    listItem: (item: any) => any
}
export interface ObjectAction {
    predicate: (key: String, content: any) => boolean,
    nameMapper: (key: string) => string
    transformer: (content: any) => any,
}

export function iterateList(list: any[], pa: ListAction[]): any[] {
    let buildList: any[] = [];

    for (let listElement of list) {
        for (let predicateAction of pa) {
            if (predicateAction.predicate(listElement, listElement)) {
                buildList.push(predicateAction.listItem(listElement));
            }
        }
    }
    return buildList;
}

export function iterateObject(object: any, objectActions: ObjectAction[]): {} {
    let buildObject:any = {};
    let keys = Object.keys(object);
    for (let key of keys) {
        for (let predicateAction of objectActions) {
            if (predicateAction.predicate(key, object[key])) {
                buildObject[predicateAction.nameMapper(key)] = predicateAction.transformer(object[key])
            }
        }
    }
    return buildObject;
}