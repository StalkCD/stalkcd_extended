import { Runner } from './Runner';
import { GitHubDownloader } from './JenkinsfileDownloader';
import { TestUtils } from '../test/TestUtils';
import { Jenkins2StalkCDEvaluation } from '../test/Jenkins2StalkCdEvaluation';
import {compileFromFile} from "json-schema-to-typescript";
//import fs from "fs";

enum Mode {
    Help,
    Bpmn2StalkCd,
    Bpmn2Jenkins,
    StalkCd2Jenkins,
    StalkCd2Bpmn,
    Jenkins2StalkCd,
    NormalizeJenkinsfile,
    DownloadSampleJenkinsfiles,
    EvaluateJ2S,
    Test
}

let mode: Mode = Mode.Help;
let config: any;

const { program } = require('commander');

program
    .version('1.0.0');

program
    .command('bpmn2stalkcd')
    .option('-s, --source [file]', 'the source file [stalk-cd.bpmn]', 'stalk-cd.bpmn')
    .option('-t, --target [file]', 'the target file [stalk-cd.yml]', 'stalk-cd.yml')
    .action((cmd:String) => {
        mode = Mode.Bpmn2StalkCd;
        config = cmd;
    });

program
    .command('stalkcd2jenkins')
    .option('-s, --source [file]', 'the source file [stalk-cd.yml]', 'stalk-cd.yml')
    .option('-t, --target [file]', 'the target file [Jenkinsfile]', 'Jenkinsfile')
    .action((cmd:String) => {
        mode = Mode.StalkCd2Jenkins;
        config = cmd;
    });

program
    .command('jenkins2stalkcd')
    .option('-s, --source [file]', 'the source file [Jenkinsfile]', 'Jenkinsfile')
    .option('-t, --target [file]', 'the target file [stalk-cd.yml]', 'stalk-cd.yml')
    .action((cmd:String) => {
        mode = Mode.Jenkins2StalkCd;
        config = cmd;
    });

program
    .command('bpmn2jenkins')
    .option('-s, --source [file]', 'the source file [stalk-cd.bpmn]', 'stalk-cd.bpmn')
    .option('-t, --target [file]', 'the target file [Jenkinsfile]', 'Jenkinsfile')
    .action((cmd:String) => {
        mode = Mode.Bpmn2Jenkins;
        config = cmd;
    });

program
    .command('stalkcd2bpmn')
    .option('-s, --source [file]', 'the source file [stalk-cd.yml]', 'stalk-cd.yml')
    .option('-t, --target [file]', 'the target file [stalk-cd.bpmn]', 'stalk-cd.bpmn')
    .action((cmd:String) => {
        mode = Mode.StalkCd2Bpmn;
        config = cmd;
    });

program
    .command('normalize-jenkinsfile')
    .option('-s, --source [file]', 'the source file')
    .option('-t, --target [file]', 'the target file')
    .action((cmd:String) => {
        mode = Mode.NormalizeJenkinsfile;
        config = cmd;
    });

program
    .command('download-sample-jenkinsfiles')
    .option('-d, --directory [directory]', 'the target directory [res/Jenkinsfiles.source]')
    .option('-q, --query [query]', 'the search term to search for on GitHub')
    .action((cmd:String) => {
        mode = Mode.DownloadSampleJenkinsfiles;
        config = cmd;
    });

program
    .command('evaluate-jenkins2stalkcd')
    .action((cmd:String) => {
        mode = Mode.EvaluateJ2S;
        config = cmd;
    });

program.command('test')
    .action((cmd:String) => {
        mode = Mode.Test;
        config = cmd;
    })

program.on('--help', () => {
    console.log('');
    console.log('For more information, append -h after a command');
    }
)


program.parse(process.argv);

switch (+mode) {
    case Mode.Bpmn2StalkCd:
        console.log('Transforming BPMN > StalkCD...');
        new Runner().bpmn2stalkCd(config);
        break;
    case Mode.StalkCd2Jenkins:
        console.log('Transforming StalkCD > Jenkinsfile...');
        new Runner().stalkCd2jenkinsfile(config);
        break;
    case Mode.Bpmn2Jenkins:
        console.log('Transforming BPMN > Jenkinsfile...');
        new Runner().bpmn2jenkins(config);
        break;
    case Mode.StalkCd2Bpmn:
        console.log('Transforming StalkCD > BPMN...');
        new Runner().stalkCd2bpmn(config);
        break;
    case Mode.Jenkins2StalkCd:
        console.log('Transforming Jenkinsfile > StalkCD...');
        new Runner().jenkinsfile2stalkCd(config);
        break;
    case Mode.NormalizeJenkinsfile:
        console.log('Normalizing Jenkinsfile...');
        new Runner().normalizeJenkinsfile(config);
        break;
    case Mode.DownloadSampleJenkinsfiles:
        let query = 'pipeline agent filename:Jenkinsfile in:file';
        if (config.query) {
            query = config.query;
        }
        let dir = 'res/Jenkinsfiles.source';
        if (config.directory) {
            dir = config.directory;
        }
        new GitHubDownloader(dir).download(query);
        break;
    case Mode.EvaluateJ2S:
        new Jenkins2StalkCDEvaluation().evaluate();
        break;
    case Mode.Test:
        TestUtils.validateJsonSchema("res/schema/github-workflow.json", ".github/workflows/main.yml")
        TestUtils.generateTypesFromJsonSchema("res/schema/github-workflow.json", "src/main/model/GitHubActions/generatedTypes.ts");
        break;
    default:
        program.outputHelp();
        break;
}
