export class ParsingImpossibleError extends Error {
    name: string = "ParsingImpossibleError";
    reason: ParsingImpossibleReason;

    constructor(message: string, reason: ParsingImpossibleReason) {
        super(message);
        this.reason = reason;
    }
}

export enum ParsingImpossibleReason {
    OnIsUnknownType= "OnIsUnknownType",
    UnableToHandleReusableWorkflowCallJob = "UnableToHandleReusableWorkflowCallJob",
    SelfHosted = "SelfHosted",
    HasOutput = "HasOutput",
    ContinueOnErrorIsString = "ContinueOnErrorIsString",
    StepId = "StepId",
    StepIf = "StepIf",
    StepWith = "StepWith",
    StepEnvironment = "StepEnvironment",
    StepTimeoutMinutes = "StepTimeoutMinutes",
    StepContinueOnError = "StepContinueOnError",
    ValidationFailed = "ValidationFailed",
    UnknownError = "UnknownError",
}