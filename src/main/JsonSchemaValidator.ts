import {PathLike} from "fs";
import Ajv from "ajv";
import * as yaml from "js-yaml";
import {throws} from "assert";
import {ValidationError} from "./errors/ValidationError";
import * as fs from "fs";

export class JsonSchemaValidator {
    ajv: Ajv;
    schema: any;

    constructor(schemaPath: PathLike) {

        // report all validation errors (rather than failing on the first errors)
        //TODO GitHub JSON Schema nutzen, dass im strict mode keine Fehler wirft?
        this.ajv = new Ajv({allErrors: true, strict: false});
        const schema = JSON.parse(fs.readFileSync(schemaPath).toString("utf8"));
        this.schema = this.ajv.compile(schema);
    }

    public validate(dataPath: PathLike ): any {
        const data = yaml.load(fs.readFileSync(dataPath, { encoding: 'utf8' }));

        const valid: boolean = this.schema(data);
        if (valid == true){
            return valid
        }

        else
        {
            return this.schema
        }

        //valid ? return valid : throws(() => new ValidationError(this.schema.errors));

        //TODO GHA Roundtrip nutzt auch diese Methode, diese Klassen muss entsprechend angepasst werden

    }

}