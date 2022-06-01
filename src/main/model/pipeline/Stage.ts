import { Step, IStep } from "./Step";
import { clean, sortObject, PositionAwareObject } from "../../util";
import { IPostSection, PostSection } from "./PostSection";
import { IAgentOption } from "./AgentSection";
import { IEnvironmentVariable } from "./EnvironmentSection";

/**
 * This Interface represents two concepts in the meta-model.
 * 1. Stages --> this is handled in the constructor where the stages are mapped.
 * 2. Stage --> if no Stage-Children are present in the stages attribute.
 *
 * This Concept is rather confusing and is prone to misuse.
 */
export interface IStage {

    name: string;
    failFast?: boolean;
    baseName?: string;
    isAutoStage?: boolean;
    parent?: IStage;
    agent?: IAgentOption[];
    environment?: IEnvironmentVariable[];
    options?: string[];
    tools?: string[];
    input?: string[];
    when?: string; // TODO: corresponding to the meta-model this should be string[]
    parallel?: boolean;
    steps?: IStep[] ;
    stages?: IStage[];
    post?: IPostSection;
    
}

export class Stage extends PositionAwareObject<IStage> {

    constructor(
        init: IStage,
    ) {
        super();
        Object.assign(this, init);
        if (init.stages) {
            this._stages = init.stages.map(s => new Stage(s));
        }
        if (init.steps) {
            this._steps = init.steps.map(s => Step.fromSerial(s));
        }
        if (init.post) {
            this._post = PostSection.fromSerial(init.post);
        }

        this.savePropertyPosition(init);
    }

    private _name: string = "";
    private _baseName?: string;
    private _failFast?: boolean;
    private _parallel: boolean = false;
    private _agent?: IAgentOption[];
    private _environment?: IEnvironmentVariable[];
    private _options?: string[];
    private _tools?: string[];
    private _input?: string[];
    private _when?: string;
    private _steps?: Step[];
    private _stages?: Stage[];
    private _post: PostSection = new PostSection();


    get isEmpty(): boolean {
        return (!this._steps || this._steps.length === 0)
            || (!this._stages || this._stages.length === 0);
    }

    toSerial(): any {
        const res: IStage = {
            name: this._name,
            failFast: this._failFast,
            baseName: this._baseName,
            agent: clean(this._agent),
            environment: clean(this._environment),
            options: clean(this._options),
            tools: clean(this._tools),
            input: this._input,
            when: this._when,
            parallel: this._parallel ? true : undefined,
            steps: this._steps ? this._steps.map(s => s.toSerial()) : undefined,
            stages: this._stages ? this._stages.map(s => s.toSerial()) : undefined,
            post: this._post.toSerial(),
        };
        return clean(sortObject(res, this.propertiesOrder));
    }

    set baseName(value: string) {
        this._baseName = value;
    }

    set failFast(value: boolean) {
        this._failFast = value;
    }

    set parallel(value: boolean) {
        this._parallel = value;
    }

    set agent(value: IAgentOption[]) {
        this._agent = value;
    }

    set environment(value: IEnvironmentVariable[]) {
        this._environment = value;
    }

    set options(value: string[]) {
        this._options = value;
    }

    set tools(value: string[]) {
        this._tools = value;
    }

    set input(value: string[]) {
        this._input = value;
    }

    set when(value: string) {
        this._when = value;
    }

    set steps(value: Step[]) {
        this._steps = value;
    }

    set post(value: PostSection) {
        this._post = value;
    }
}
