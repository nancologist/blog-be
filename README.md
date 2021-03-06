# Blog - Backend

## Technologies:
* NodeJS, Typescript, ExpressJS
* MongoDB on Cloud (Atlas)
* AWS S3 (AWS SDK)
* Automated Deployment on Heroku (triggered via push on master)

## Init
1. `sudo npm install -g typescript` (IF not installed on your machine)
2. `tsc --init`
3. `npm init`
4. `npm install --save express`
5. `npm install --save body-parser` (Express 4.16+ versions have re-added the BodyParser again!)
6. `npm install --save-dev @types/node`
7. `npm install --save-dev @types/express`
8. `npm install --save-dev @types/body-parser`
9. In `tsconfig.json`:
    * `"rootDir": "./src"`
    * `"outDir": "./dist"` (also change the package.json scripts)
    * `"moduleResolution": "node"`
10. `npm install --save-dev nodemon`

11. `npm install --save multer`
12. `npm install --save-dev @types/multer`

14. `npm install @aws-sdk/client-s3`
15. `npm install --save-dev dotenv` (Put it in the NPM RUN script and NOT on the code otherwise Heroku yells that the dependency is not found as it is a Dev dep package!)
16. ~~`npm i oracledb` Orcale SODA~~
17. `npm install --save-dev @types/multer`

## Run
1. ~~`tsc --watch`~~
2. `npm run serve` ~~(in a parallel terminal)~~

## Problems & Solutions
* Problem 1:
    * __What:__ The API code did not run after deploying on Heroku
    * __Reason:__ Because Heroku looks at `npm start` script and there it expects `node ...` and NOT `nodemon ...`
    * __Solution:__ I leave `npm start` for deployment and heroku and use `npm run serve` for local development.

## Notes
* To send file, For `multer` you should always use the __NAME__ of the field you passed on the frontend to the `new FormData().append(NAME, ...)` And also you should add the `multipart` header for FE-request.

* Because the upload process write files on system you should `sudo npm run serve` and before that you should run it from an admin account on your machine so: `su <admin-username>` and then password.
___

## Oracle DB Connection (NodeJS + macOS)
https://www.oracle.com/database/technologies/appdev/quickstartnodejs.html#macos-tab

CANCELED: There's a large file in `instantclient_19_8/` which needs Git LFS, but even if it's solved, this Instant Client is for MacOS, I'm not sure after deploying on Heroku it's gonna work. (Probabley Heroku has an instance of Linux!) I develop on MacOS so it makes the process very complicated. So I should go for another cloud db...
___

## MangoDB
* `db.collection.insert()` is deprecated. Use instead `.insertOne()` or `.insertMany()`
