import {GithubWorkflow} from "./GeneratedTypes";
import * as fs from "fs";
import {PathLike} from "fs";
import * as yaml from 'js-yaml';
import {JsonSchemaValidator} from "../../JsonSchemaValidator";


export class GithubActionsFileParser {
    private jsonSchemaValidator: JsonSchemaValidator;

    public static readonly GITHUB_WORKFLOW_SCHEMA_PATH: PathLike = "res/schema/github-workflow.json";

    constructor() {
        this.jsonSchemaValidator = new JsonSchemaValidator(GithubActionsFileParser.GITHUB_WORKFLOW_SCHEMA_PATH);
    }

    /**
     * Returns an GithubWorkflow-Object.
     * If the file is not a valid GithubActionsWorkflow yml-File, an ValidationError is thrown.
     * @param input
     */
    parse(input: PathLike): GithubWorkflow {
        this.jsonSchemaValidator.validate(input);
        return <GithubWorkflow>yaml.safeLoad(fs.readFileSync(input, {encoding: 'utf8'}));
    }
}