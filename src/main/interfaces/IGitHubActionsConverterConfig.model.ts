import { IConverterConfig } from ".";

export interface IGitHubActionsConverterConfig extends IConverterConfig{
    singleFileTransformation: Boolean,
    evaluationCreateYaml: Boolean
}