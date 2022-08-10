import {clean} from "../../util";

export interface IStep {
    label?: string;
    command?: string;

    // experimental
    reusableCallParameters?: Map<string, string | number | boolean>
    environment?: Map<string, string | number | boolean>
}

export class Step {
    constructor(
        init: IStep,
    ) {
        this.label = init.label;
        this.command = init.command;

        // experimental
        this.environment = init.environment
        this.reusableCallParameters = init.reusableCallParameters
    }

    label?: string;
    command?: string;

    // experimental
    reusableCallParameters?: Map<string, string | number | boolean>
    environment?: Map<string, string | number | boolean>


    toSerial(): any {
        return clean(Object.assign({}, this));
    }

    public static fromSerial(init: IStep): Step {
        return new Step(init as IStep);
    }
}
