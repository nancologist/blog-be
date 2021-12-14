# Blog - Backend (NodeJS + ~~TS~~)

## Init
1. ~~`sudo npm install -g typescript`~~
2. ~~`tsc --init`~~
3. `npm init`
4. `npm install --save express`
5. `npm install --save body-parser`
6. ~~`npm install --save-dev @types/node`~~
7. ~~`npm install --save-dev @types/express`~~
8. ~~`npm install --save-dev @types/body-parser`~~
9. ~~In `tsconfig.json`:~~
    * `"rootDir": "./src"`
    * `"outDir": "./dist"`
    * `"moduleResolution": "node"`
10. `npm install --save-dev nodemon`

11. `npm install --save multer`
12. ~~`npm install --save-dev @types/multer`~~

13. UPDATE: AS IT REDUCE THE DEVELOPMENT SPEED, I HAVE CHANGED THE WHOLE BACKEND CODE TO NORMAL NODEJS (JAVASCRIPT), BUT IF YOU NEED YOU CAN USE ABOVE STEPS TO HAVE NODEJS + EXPRESSJS + TS

14. `npm install @aws-sdk/client-s3`
15. `npm install --save-dev dotenv`

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