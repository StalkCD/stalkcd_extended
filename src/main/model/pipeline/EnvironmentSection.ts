
export interface IEnvironmentVariable {
    name: string;
    value: string;
}

export class EnvironmentVariable implements IEnvironmentVariable {
    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
    name: string;
    value: string; // TODO: this should be string | number | boolean
}

export enum EnvironmentalVariableNameMarker {
    EXTERNAL_ENVIRONMENT = "EXTERNAL_ENVIRONMENT"
}