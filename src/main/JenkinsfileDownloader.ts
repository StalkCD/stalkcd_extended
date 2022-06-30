import * as readline from 'readline-sync';
import * as fs from 'fs';
import {URLSearchParams} from 'url';
import fetch from 'node-fetch';
import {RequestInit, Response} from 'node-fetch';


const GITHUB_API_VERSION = 'application/vnd.github.v3+json'; // https://docs.github.com/en/rest/overview/resources-in-the-rest-api

type GitHubFiles = {
    url: string;
    name: string;
    repository: { full_name: string }
}[]

export class GitHubDownloader {

    private token?: string;

    private allFileNames: any = {};

    constructor(
        private targetDir: string,
    ) {
        if (this.targetDir.endsWith('/')) {
            this.targetDir = this.targetDir.substr(0, this.targetDir.length - 1);
        }
        if (!fs.existsSync(this.targetDir)) {
            fs.mkdirSync(this.targetDir, {recursive: true});
        }
        if (!fs.statSync(this.targetDir).isDirectory()) {
            throw new Error('The target is no directory');
        }
    }

    /**
     * Extracts the link to the next Page
     * @param result result of the last page.
     * @private
     */
    private static getNextDownloadUrl(result: Response) {
        const link = result.headers.get('link');
        if (!link) {
            return undefined;
        }
        const linkMatch = /<([^>]*?)>; rel="next"/.exec(link);
        return linkMatch && linkMatch.length >= 2 ? linkMatch[1] : undefined;
    }

    /**
     * Initiates the download process
     */
    public async download(query: string) {
        if (!this.token) {
            console.log('Please provide GitHub Token');
            if (!this.token) {
                this.token = readline.question('Token: ');
            }
        }

        console.log('\nDownloading search results from GitHub...');

        let downloadUrl: string | undefined = GitHubDownloader.buildUrl('https://api.github.com/search/code', {
            q: query,
            per_page: 99,
        });

        let allFiles: GitHubFiles = await this.getFilesList(downloadUrl);
        await this.downloadFilesInList(allFiles);
    }


    /**
     * Concat all DownloadUrls to an Array.
     * If Error is thrown retry limit is 10; Time between retry is 1min
     * All collected files in form of a GitHub item: https://developer.github.com/v3/search/#search-code
     * @param downloadUrl the initial URL to download the Files from.
     * @private
     */
    private async getFilesList(downloadUrl: string | undefined): Promise<GitHubFiles> {
        let allFiles: GitHubFiles = [];
        console.log(`${downloadUrl}`)
        console.log('and following pages ...')
        while (downloadUrl) {
            const result: Response = await this.tryFetch(downloadUrl);
            const resultJson: any = await result.json();

            if (!resultJson.items || !Array.isArray(resultJson.items)) {
                throw new Error('Got unexpected result.\n' + result);
            }
            allFiles = allFiles.concat(resultJson.items);

            downloadUrl = GitHubDownloader.getNextDownloadUrl(result);
        }
        return allFiles;
    }

    /**
     * Download up to 10 files at the same time
     * Skipps if the File already exists or if it is a TypeScript File.
     * @param allFiles - List of all Files to be downloaded
     * @private
     */
    private async downloadFilesInList(allFiles: { url: string; name: string; repository: { full_name: string } }[]) {
        console.log('\n---------');
        console.log(`Found ${allFiles.length} files`);
        console.log(`Starting to download all files`);
        let skipped = 0;
        let typeScriptFilesSkipped = 0;
        let downloaded = 0;
        let buffer: { promise?: Promise<void> }[] = [];
        for (let i = 0; i < allFiles.length; i++) {
            if (buffer.length > 10) {
                if (buffer[0] && buffer[0].promise) {
                    await buffer[0].promise;
                }
            }
            const file = allFiles[i];
            let filename_addition = '';

            // Make unique file name
            let filename_unique_id = 0;
            while (this.allFileNames[this.getFileName(file.repository.full_name, filename_addition, file.name)]) {
                filename_addition = '.' + ++filename_unique_id;
            }

            const targetFileName = this.getFileName(file.repository.full_name, filename_addition, file.name);
            this.allFileNames[targetFileName] = true;

            if (fs.existsSync(targetFileName)) {
                // console.log(`Skipping ${targetFileName} as it already exists.`);
                skipped++;
                continue;
            }

            // console.log(`\n(${i + 1} / ${allFiles.length}): ${file.repository.full_name}`);
            // console.log(`   > ${targetFileName}`);

            const bufferContainer: {
                promise?: Promise<void>,
            } = {};
            buffer.push(bufferContainer);
            bufferContainer.promise = new Promise<void>(async (resolve, reject) => {
                try {
                    const fileResponse = await this.tryFetch(file.url);
                    const fileDescription: any = await fileResponse.json();
                    const fileContentsResponse = await this.tryFetch(fileDescription.download_url);
                    const fileContents = await fileContentsResponse.text();
                    fs.writeFile(targetFileName, fileContents, (err) => {
                        if (err) {
                            console.error(`Could not write to '${targetFileName}'`, err);
                        }
                    });
                    resolve();
                } catch (err) {
                    reject(err);
                } finally {
                    buffer.splice(buffer.indexOf(bufferContainer), 1);
                }
            });
            downloaded++
        }
        console.log(`Skipped: (${skipped}/${allFiles.length})`)
        if (typeScriptFilesSkipped > 0) {
            console.log(`Skipped because they were TypeScript Files: ${typeScriptFilesSkipped}`);
        }
        console.log(`Downloaded: (${downloaded}/${allFiles.length})`)
    }

    private getFileName(repoName: string, addition: string, extension: string): string {
        return `${this.targetDir}/${repoName.replace('/', '_')}${addition}.${extension}`;
    }

    /**
     * Builds an URL with parameters
     * @param url
     * @param params
     */
    private static buildUrl(url: string, params: any): string {
        let res = url;
        const paramsBuilder = new URLSearchParams();
        for (const key in params) {
            if (!params.hasOwnProperty(key)) {
                continue;
            }
            paramsBuilder.append(key, params[key]);
        }
        const paramsString = paramsBuilder.toString();
        if (paramsString) {
            res += '?' + paramsString;
        }
        return res;
    }

    /**
     * Tries to download a URL and retries if it fails to handle rate limits
     * @param url - the url to fetch
     * @param retryCount - the initial retry count, max retry is 10
     */
    private async tryFetch(url: string, retryCount = 0): Promise<Response> {
        let fetchParams: RequestInit = {
            headers: {
                'Accept': GITHUB_API_VERSION,
                'Authorization': 'token ' + this.token,
            },
        };
        let res: Response = new Response();
        try {
            res = await fetch(url, fetchParams);
        } catch (err) {
            console.error(err);
        }

        if (!res || !res.ok) {
            if (res && res.status === 403 && retryCount < 10) {
                const waitTime = 60000;
                console.log(`${res.status} ${res.statusText} - Waiting ${waitTime / 1000} s before retrying (${retryCount + 1} / 10)`);
                return new Promise<Response>((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            const res = this.tryFetch(url, retryCount + 1);
                            resolve(res);
                        } catch (err) {
                            reject(err);
                        }
                    }, waitTime);
                });
            }

            // Permanent error.
            console.error(`Request failed.`);
            console.error(`  URL: ${url}`);
            console.error(`  Res: ${res ? res.status + ' ' + res.statusText : 'Not available'}`);
            if (res) {
                const resText = await res.text();
                console.error(resText.substr(0, 5000)); // Arbitrary limit
            }
            throw new Error(res ? res.statusText : 'Query failed');
        }

        // Check rate limit
        const rateLimitRemaining: number = +(res.headers.get('X-RateLimit-Remaining') || 1);
        const rateLimitReset: number = +(res.headers.get('X-RateLimit-Reset') || NaN);
        if (!isNaN(rateLimitRemaining) && rateLimitRemaining === 0 && !isNaN(rateLimitReset)) {
            // Wait before returning the result to repsect rate limit
            const waitSecs = rateLimitReset - new Date().getTime() / 1000;
            console.log(`Rate limit hit. Waiting for ${waitSecs} s.`);

            return new Promise<Response>((resolve) => {
                setTimeout(() => {
                    resolve(res);
                }, waitSecs * 1000);
            });
        }

        console.log("request successful: " + url)
        return res;
    }

}
