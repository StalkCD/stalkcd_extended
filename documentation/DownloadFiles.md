# Download Sample Jenkinsfiles
The tool can download sample Jenkinsfiles from GitHub. During execution, it asks for your GitHub credentials, as the search API accross repositories is only accessible for logged-in users.

You have to provide a search expression. For example, to find all Jenkinsfiles written in the declarative syntax, you could use an expression like *'pipeline agent filename:Jenkinsfile in:file'*.

Example:

```shell
./stalkcd download-sample-jenkinsfiles -d ./res/Jenkinsfiles.source -q 'pipeline agent filename:Jenkinsfile in:file'
```

Note that the GitHub API only returns up to approx. 1000 search results.
If you need more results, you can slightly vary the search expression and run the command multiple times.
Already downloaded files will not be downloaded once again.

## Github-API-Token
If it becomes necessary to download a further bulk of files than already exist in the project,
with Github-API-V3 it is necessary to get an Github-API-Token

It is possible to generate a token when logged in to Github:
```
Settings > Developer Settings > Personal access tokens > Generate new token
```
When creating the token no scope is required.
After the token is created, it is only shown once.
It is therefore required to save it separately.

![Github generate token page](images/github_tokenPage.png)

[//]: # (![Github token scope]&#40;images/github_scopePage.png&#41;)

The documentation about tokens is [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
and about the rate limit [here](https://docs.github.com/en/rest/rate-limit).

After generating the Token it might be needed to test if the token actually works how expected.
There are some tools available which support making REST-Requests, notably is [curl](https://curl.se/download.html) and [Postman](https://www.postman.com/downloads/).

The following Screenshots are taken in Postman.
The first shows how the request is structured and the second how to do the authentication with the Github-API.
![Get-Request-Parameters](images/postman_query.png)
![Authorization Github-API](images/postman_authorization.png)

