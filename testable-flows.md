# Test scenarios

The idea is to start with positive scenarios and only then proceed with negative.
First for sure goes the easiest positive scenario that is most basic usecase.
So even if our application is going to up updated, this test still be actual.
Checking of description, clicking "Go" vs pressing "Enter", private vs public repos, user name vs organization name can be using pairwise testing technique spread across available test cases.
Test data should be also treated carefully, there are several options to have autotests relying on exact data:
* Using API / DB scripts create needed repos before test and after test clean that up
* Have already configured different users for each test case (do not update them!)
* Mock the response (but check in other tests that integration is not broken!)

Scenarios:
1. Provide valid github username and click "Go". 
Check all public repositories displayed (ideally to have repositories with and without descriptions, private and public) and success message shown.
2. Provide valid github username, click "Go" and click on the repository name.
Check new tab is opened with the repo page on github.
3. Provide invalid github username and click "Go".
Check "user not found" error message displayed.
4. Provide invalid github username that will cause 400 error from github (user percent symbol).
Check "Something went wrong" error displayed.
5. Provide valid github username that is having big amount (more than 30 as it's default page size in Github) of repositories and click "Go".
Check all repositories displayed (gonna fail) and success message shown.
6. Provide valid github username that is having no repositories and click "Go".
Check displayed "No repos" but success message shown.
7. Do not provide github username and press "Enter".
Check "user not found" error message displayed.