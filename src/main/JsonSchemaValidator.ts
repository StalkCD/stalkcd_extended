import {PathLike} from "fs";
import Ajv from "ajv";
import * as yaml from "js-yaml";
import {throws} from "assert";
import {ValidationError} from "./errors/ValidationError";
import * as fs from "fs";

export class JsonSchemaValidator {
    schema: any;

    constructor(schemaPath: PathLike) {
        let ajv = new Ajv();
        const schema = JSON.parse(fs.readFileSync(schemaPath).toString("utf8"));
        this.schema = ajv.compile(schema);
    }

    public validate(dataPath: PathLike ) {
        const data = yaml.safeLoad(fs.readFileSync(dataPath, { encoding: 'utf8' }));
        const valid: boolean = this.schema(data);
        valid ? console.log(`successfully validated file ${dataPath}.`) : throws(() => new ValidationError(this.schema.errors));
    }

}