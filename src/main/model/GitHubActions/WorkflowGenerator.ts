import {IPipeline, Pipeline} from "../pipeline/Pipeline";
import {WorkflowBuilder} from "./GithubWorkflowBuilder";

export interface WorkflowGenerator {


    run(pipeline: Pipeline): any;

}