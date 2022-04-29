import { compile, compileFromFile } from 'json-schema-to-typescript'
import * as fs from "fs";
import {PathLike} from "fs";


export class GithubActionsWorkflowGenerator {
    static generate(schema: PathLike) {
        compileFromFile(schema.toString())
            .then(ts => fs.writeFileSync('generated/GeneratedGithubActionTypes.d.ts', ts))
    }
}
