export class ParsingImpossibleError extends Error {
    name: string = "ParsingImpossibleError";
    reason: ParsingImpossibleReason;

    constructor(message: string, reason: ParsingImpossibleReason) {
        super(message);
        this.reason = reason;
    }
}

export enum ParsingImpossibleReason {
    OnIsUnknownType,
    UnableToHandleReusableWorkflowCallJob,
    SelfHosted,
    HasOutput,
    ContinueOnErrorIsString,
    StepId,
    StepIf,
    StepWith,
    StepEnvironment,
    StepTimeoutMinutes,
    StepContinueOnError,
}