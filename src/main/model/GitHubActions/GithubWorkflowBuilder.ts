import {removeUndefinedKeys} from "../util/Utils";

export class WorkflowBuilder {

    // values of GithubActionWorkflow
    private _on: string | string[] | undefined;
    private _name: string | undefined;
    private _env: {
        [k: string]: string | number | boolean | undefined;
    } | undefined | string;
    private _defaultsRun: {
        [k: string]: string;
    } | undefined;
    private _concurrency: string | object | undefined
    private _permissions: string | object | undefined;
    private _jobs: {
        [k: string]: any;
    } = {}
    private _currentJob: JobBuilder = new JobBuilder(this, "", this._jobs);

    //used to store information from jenkinsfile which could not mapped to a valid GitHub Workflow object
    private _unknownWorkflowOptions : string | object | undefined;

    // used to store the post section from a jenkinsfile workflow
    private _postsection : string | object | undefined;

    // flags
    private readonly doExperimentalConversion: boolean;

    /**
     * @param doExperimentalConversions this will only be possible if the experimental features were activated during the creation of the stalkCD object.
     * @constructor
     */
    public constructor(doExperimentalConversions?: boolean) {
        this.doExperimentalConversion = doExperimentalConversions !== undefined ? doExperimentalConversions : false;
    }

    on(value: string[]): WorkflowBuilder {
        if (value.length === 1) {
            this._on = value[0];
        } else if (this.doExperimentalConversion && value.length == 2 && value[0] === "onJSON") {
            this._on = JSON.parse(value[1])
        } else {
            this._on = value;
        }
        return this;
    }

    name(value: string | undefined): WorkflowBuilder {
        this._name = value;
        return this;
    }

    env(key: string | undefined, value: string | number | boolean | undefined): WorkflowBuilder {
        // single element
        if (this._env === undefined && key === undefined && typeof value === "string") {
            this._env = value;
            return this;
        }

        // multi-element
        if (key === undefined) {
            return this;
        }
        if (this._env === undefined) {
            this._env = {};
        }
        if (typeof this._env === "object") {
            this._env[key] = value;
        }
        return this;
    }

    defaultsRun(key: string | undefined, value: string | undefined): WorkflowBuilder {
        if (key === undefined || value === undefined) {
            return this;
        }

        // multi-element
        if (this._defaultsRun === undefined) {
            this._defaultsRun = {};
        }
        if (typeof this._defaultsRun === "object") {
            this._defaultsRun[key] = value;
        }
        return this;
    }

    concurrency(value: string | object | undefined): WorkflowBuilder {
        this._concurrency = value;
        return this;
    }


    permissions(value: string | object | undefined): WorkflowBuilder {
        this._permissions = value
        return this;
    }

    unknownOptionsObjects(value: string | object | undefined): WorkflowBuilder {
        this._unknownWorkflowOptions = " # The following options could not be mapped to GitHub Actions: " + value
        return this;
    }

    // TODO: this is conceptually wrong, please correct if possible
    //  The reason is that it is not a part of the GithubWorkflow-Datastructure but originated from Jenkins
    postSection(value: string | object | undefined): WorkflowBuilder {
        this._postsection = " #The following steps were part of the post section in the jenkinsfile. Please transform these to steps with the corresponding GHA condition: " + value
        return this;
    }

    job(id: string): JobBuilder {
        this._currentJob = new JobBuilder(this, id, this._jobs);
        return this._currentJob;
    }

    currentJob(): JobBuilder {
        return this._currentJob;
    }

    workflowDefaulthelper(): Object | undefined {
        if (this._defaultsRun != undefined) {
            return {run: this._defaultsRun}
        }
    }


    build(): any {
        // TODO: "timeout-minutes": this._timeoutMinutes,
        // TODO: options for Job(s), Henning: Die werden aus meiner Sicht nicht geparst von StalkCD?!
        let obj = {
            name: this._name,
            on: this._on,
            env: this._env,
            defaults: this.workflowDefaulthelper(),
            concurrency: this._concurrency,
            permissions: this._permissions,
            jobs: this._jobs,
            unknownWorkflowOptions: this._unknownWorkflowOptions, // TODO: remove this in future version; this is not part of GithubWorkflow-Datastructure
            jenkins_post_steps: this._postsection // TODO: remove this in future version; this is not part of GithubWorkflow-Datastructure
        };
        return removeUndefinedKeys(obj);
    }

}

class JobBuilder {
    private _id: string;
    private _parent: WorkflowBuilder;
    private _jobs: { [p: string]: any };
    private isEnd = false;
    private _steps: any[] = [];
    private _currentStep: StepBuilder = new StepBuilder(this, []);
    private _timeoutMinutes: number | undefined;
    private _env: {
        [k: string]: string | number | boolean | undefined;
    } | undefined | string;
    private _defaultsRun: {
        [k: string]: string;
    } | undefined;
    private _concurrency: string | object | undefined
    private _permissions: string | object | undefined;
    private _needs: string[] | undefined;
    private _strategy: object | undefined;
    private _runsOn: string | undefined;
    private _name: string | undefined;
    private _if: string | undefined;
    private _continueOnError: boolean | undefined;
    private _container: object | undefined;
    private _services: object | undefined;

    // used to store the post section from a jenkinsfile job
    private _postsection : string | object | undefined; // TODO: remove this in future version; this is not part of GithubWorkflow-Datastructure


    constructor(parent: WorkflowBuilder, id: string, jobs: { [p: string]: any }) {
        this._id = id
        this._parent = parent;
        this._jobs = jobs
    }

    step() {
        this._currentStep = new StepBuilder(this, this._steps);
        return this._currentStep
    }

    currentStep(): StepBuilder {
        return this._currentStep
    }

    env(key: string | undefined, value: string | number | boolean | undefined): JobBuilder {
        // single element
        if (this._env === undefined && key === undefined && typeof value === "string") {
            this._env = value;
            return this;
        }

        // multi-element
        if (key === undefined) {
            return this;
        }
        if (this._env === undefined) {
            this._env = {};
        }
        if (typeof this._env === "object") {
            this._env[key] = value;
        }
        return this;
    }

    defaultsRun(key: string | undefined, value: string | undefined): JobBuilder {
        if (key === undefined || value === undefined) {
            return this;
        }

        // multi-element
        if (this._defaultsRun === undefined) {
            this._defaultsRun = {};
            this._defaultsRun = {};
        }
        if (typeof this._defaultsRun === "object") {
            this._defaultsRun[key] = value;
        }
        return this;
    }

    concurrency(value: string | object | undefined): JobBuilder {
        this._concurrency = value;
        return this;
    }


    permissions(value: string | object | undefined): JobBuilder {
        this._permissions = value
        return this;
    }


    needs(value: string | undefined): JobBuilder {
        if (value) {
            if (this._needs === undefined) {
                this._needs = []
            }
            this._needs.push(value);
        }
        return this;
    }

    timeoutMinutes(value: number | undefined): JobBuilder {
        this._timeoutMinutes = value;
        return this;
    }

    strategy(value: object | undefined): JobBuilder {
        this._strategy = value;
        return this
    }

    runsOn(value: string | undefined): JobBuilder {
        this._runsOn = value;
        return this;
    }

    // TODO: remove this in future version; this is not part of GithubWorkflow-Datastructure
    postSection(value: string | object | undefined): JobBuilder {
        this._postsection = " #The following steps were part of the post section in the jenkinsfile. Please transform these to steps with the corresponding GHA condition: " + value
        return this;
    }

    end(): WorkflowBuilder {
        if (this.isEnd) { // never add the save job twice
            return this._parent;
        }
        this._jobs[this._id] = this.build();
        this.isEnd = true;
        return this._parent
    }

    jobDefaulthelper(): Object | undefined {
        if (this._defaultsRun != undefined) {
            return {run: this._defaultsRun}
        }
    }


    name(name: string): JobBuilder {
        this._name = name
        return this
    }

    ifExpression(ifExpression: string | undefined): JobBuilder {
        this._if = ifExpression;
        return this
    }

    continueOnError(continueOnError: boolean | undefined): JobBuilder {
        this._continueOnError = continueOnError
        return this
    }

    container(container: object): JobBuilder {
        this._container = container
        return this
    }

    service(service: object): JobBuilder {
        this._services = service
        return this
    }

    private build(): any {
        return {
            name: this._name,
            "runs-on": this._runsOn,
            needs: this._needs, // TODO: if only one element is present just put a string, ignore if empty
            defaults: this.jobDefaulthelper(),
            permissions: this._permissions,
            concurrency: this._concurrency,
            services: this._services,
            container: this._container,
            env: this._env,
            strategy: this._strategy,
            "timeout-minutes": this._timeoutMinutes,
            if: this._if,
            steps: this._steps,
            "continue-on-error": this._continueOnError,
            jenkins_post_steps: this._postsection // TODO: remove this in future version; this is not part of GithubWorkflow-Datastructure
        }
    }
}

class StepBuilder {
    private _parent: JobBuilder;
    // noinspection JSMismatchedCollectionQueryUpdate
    private _steps: any[];
    private _isEnd = false;
    private _name: string | undefined;
    private _shell: string | undefined;
    private _run: string | undefined;
    private _uses: string | undefined;
    private _if: string | undefined;
    private _env: { [p: string]: string | number | boolean } | undefined;
    private _with: { [p: string]: string | number | boolean } | undefined;
    private _workingDirectory: string | undefined;

    constructor(parent: JobBuilder, steps: any[]) {
        this._parent = parent;
        this._steps = steps
    }

    end() {
        if (this._isEnd) {
            return this._parent
        }
        this._isEnd = true
        this._steps.push(this.build());
        return this._parent;
    }

    private build(): any {
        return {
            name: this._name,
            shell: this._shell,
            run: this._run,
            uses: this._uses,
            if: this._if,
            env: this._env,
            with: this._with,
            "working-directory": this._workingDirectory
        };
    }

    name(label: string | undefined): StepBuilder {
        this._name = label
        return this;
    }

    shell(shell: string | undefined): StepBuilder {
        this._shell = shell;
        return this
    }

    run(run: string | undefined): StepBuilder {
        this._run = run;
        return this;
    }

    uses(uses: string | undefined): StepBuilder {
        this._uses = uses;
        return this;
    }

    if(ifStatement: string | undefined): StepBuilder {
        this._if = ifStatement;
        return this
    }

    env(env: { [p: string]: string | number | boolean } | undefined): StepBuilder {
        this._env = env;
        return this
    }

    with(withParameters: { [p: string]: string | number | boolean } | undefined): StepBuilder {
        this._with = withParameters;
        return this
    }

    workingDirectory(workingDirectory: string | undefined): StepBuilder {
        this._workingDirectory = workingDirectory;
        return this
    }
}
