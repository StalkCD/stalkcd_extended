import {PathLike} from "fs";
import Ajv from "ajv";
import * as yaml from "js-yaml";
import {throws} from "assert";
import {ValidationError} from "./errors/ValidationError";
import * as fs from "fs";

export class JsonSchemaValidator {
    ajv: Ajv;
    schema: any;

    constructor(schemaPath: PathLike, continueOnError?: Boolean) {
        if (continueOnError){
            // report all validation errors (rather than failing on the first errors)
            //TODO GitHub JSON Schema nutzen, dass im strict mode keine Fehler wirft?
            this.ajv = new Ajv({allErrors: true, strict: false});
        }
        else{
            this.ajv = new Ajv();
        }
        const schema = JSON.parse(fs.readFileSync(schemaPath).toString("utf8"));
        this.schema = this.ajv.compile(schema);
    }

    /**
     * The file is schema-valid if the method runs error free.
     * @param dataPath the path to the respective file.
     */
    public validate(dataPath: PathLike ) {
        const data = yaml.load(fs.readFileSync(dataPath, { encoding: 'utf8' }));
        const valid: boolean = this.schema(data);
        valid ? console.log(`successfully validated file ${dataPath}.`) : throws(() => new ValidationError(this.schema.errors));
    }

    public validateObject(data: object ) {
        const valid: boolean = this.schema(data);
        valid ? console.log("successfully validated.") : throws(() => new ValidationError(this.schema.errors));
    }

    // TODO usages still need to get new method name!
    public validateWithoutException(dataPath: PathLike ): any {
        const data = yaml.load(fs.readFileSync(dataPath, { encoding: 'utf8' }));

        const valid: boolean = this.schema(data);
        if (valid == true){
            return valid
        }

        else
        {
            return this.schema
        }

    }
}