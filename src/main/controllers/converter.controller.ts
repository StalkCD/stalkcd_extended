import { Body, Get, Post, Route, Tags } from "tsoa";
import { Runner } from "../Runner";
import { IConverterConfig, IConverterResponse, IGitHubActionsConverterConfig } from "../interfaces";
import fs = require('fs');

@Route("converter")
@Tags("Converter")
export default class ConverterController {
    
    @Post("/jenkinstostalkcd")
    public async convertJenkinsToStalkCd(@Body() body: IConverterConfig): Promise<IConverterResponse>{                    
        await new Runner().jenkinsfile2stalkCd(body);

        return {
            message: "The Conversion from Jenkinsfile to StalkCD filen was successful.",
        };
    }

    @Post("/stalkcdtojenkins")
    public async convertStalkCdToJenkins(@Body() body: IConverterConfig): Promise<IConverterResponse>{
        
        await new Runner().stalkCd2jenkinsfile(body);   

        return {
            message: "The Conversion from StalkCD file to Jenkinsfile was successful.",
        };
    }

    @Post("/stalkcdtobpmn")
    public async convertStalkCdToBPMN(@Body() body: IConverterConfig): Promise<IConverterResponse>{
            
        await new Runner().stalkCd2bpmn(body);   

        return {
            message: "The Conversion from StalkCD file to BPMN was successful.",
        };
    }

    @Post("/bpmntostalkcd")
    public async convertBPMNToStalkCd(@Body() body: IConverterConfig): Promise<IConverterResponse>{
                
        await new Runner().bpmn2stalkCd(body);   

        return {
            message: "The Conversion from BPMN to StalkCD file was successful.",
        };
    }

    @Post("/bpmntojenkins")
    public async convertBPMNToJenkins(@Body() body: IConverterConfig): Promise<IConverterResponse>{
                    
        await new Runner().bpmn2jenkins(body);   

        return {
            message: "The Conversion from BPMN to Jenkinsfile was successful.",
        };
    }

    @Post("/jenkinstogithubactions")
    public async convertJenkinsToGitHubActions(@Body() body: IGitHubActionsConverterConfig): Promise<IConverterResponse>{
        
        // TODO:
        // true muss durch variable ersetzt werden
        await new Runner().jenkinsfile2ghaFile(body, true);
        
        return {
            message: "The Conversion from Jenkinsfile to GitHub Actions file was successful.",
        };
    }

    @Get("/test")
    public async test(): Promise<IConverterResponse>{
        if (fs.existsSync('./res/_StalkCDYamls/test.yml')) {
            return {
                message: "File exists.",
            };
          } else {
            return {
                message: "File doesnt exist.",
            };
          }
    }
}