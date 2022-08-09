import {clean} from "../../util";

export interface IStep {
    environment?: Map<string, string | number | boolean>
    label?: string;
    command?: string;

}

export class Step {
    constructor(
        init: IStep,
    ) {
        this.label = init.label;
        this.command = init.command;
        this.environment = init.environment
    }

    environment?: Map<string, string | number | boolean>
    label?: string;
    command?: string;

    toSerial(): any {
        return clean(Object.assign({}, this));
    }

    public static fromSerial(init: IStep): Step {
        return new Step(init as IStep);
    }
}
