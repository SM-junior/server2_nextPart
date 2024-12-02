import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { globalErrorHandler, notFound } from './app/middleware/globalErrorHandler';
import router from './app/routes/index'

//parser
app.use(express.json());
app.use(cors());

app.use('/api/v1', router)


const test = async (req: Request, res: Response) => {
  res.send("hello from app.ts")
};


app.get('/', test)



//global error handler
app.use(globalErrorHandler)


//not found route
app.use(notFound)

export default app;

/*
server creation is typescript with express, typescript(as dependency), mongoose, cors, dotenv

installation and folder structure
-->create a folder
-->open with vs code
-->npm init -y (create server)
-->create src and dist folder in root directory
-->create app.ts and server.ts file under src folder
-->create app folder under src folder
-->create config folder under app folder
-->create index.ts file under config folder
-->install express, typescript(as dependency), mongoose, cors, dotenv
-->tsc --init (create tsconfig.json file)
-->open tsconfig.json file
-->"rootDir":"./src"
-->"outDir":"./dist" and save
-->npm i nodemon
-->on package.json file, add
"build": "tsc",
"start:dev": "nodemon ./dist/server.js", in scripts objects
-->create .env file on root directory
-->import mongodb uri link and set username, password and PORT on .env file and save it
nowimport { globalErrorHandler } from './app/middleware/globalErrorHandler';
 foimport router from './app/routes/index';
llow index.ts, app.ts, server.ts file

to run server on local machine
1.npm run build
2.npm run start:dev




explain script object in package.json file
"scripts": {
    "build": "tsc",                                       -->npm run build OR tsc
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",  
    -->kono kicu change kore save dile server automatically run hobe
    -->only use for development, not in production
    -->production a aita use korbo--> "start:prod": "nodemon ./dist/server.js",

    "start:prod": "nodemon ./dist/server.js",              -->npm run start:dev OR nodemon ./dist/server.js
    "lint": "eslint src --ignore-pattern .eslintignore",  -->npm run lint OR npx eslint src
    "lint:fix": "npx eslint src --fix",                     -->npm run lint:fix OR npx eslint src --fix
    "test": "echo \"Error: no test specified\" && exit 1" 
  },

https://www.porntrex.com/video/910828/melanie-rios-the-babysitter-volume-04-scene-3-sweet

https://xhamster.desi/videos/pure-taboo-stepmom-caught-teen-with-step-uncle-joins-in-xhMQz9r


kali linux command.............
ls-->list-->>show all folder and documents from current working directory
ls -a -->
ls -l -->show all file and directories in current directory
ls -la -->show all hidden files
la -lh -->
ls -l -h OR la -lh -->show file sizes
pwd -->
cd -->
cd - -->
cd .. -->
nano -->
cat -->
cat shahin.txt -->
cat shahin.txt -n -->
cat shahin.txt dummy.txt -->
cat Desktop/dummy.txt

mkdir rahim -->create rahim folder
touch rahim.txt -->create a file 
cat>>rahim.txt -->edit rahim.txt
cat rahim.txt -->open rahim.txt file


cat>mim.txt
cat>>mim.txt
cat mim.txt jim.txt>>merge.txt
28.53 

grep -n 'cat' rahim.txt -->find 'cat' word in rahim.txt file
grep -n 'cat' Desktop/rahim/rahim.txt -->find 'cat' word in rahim.txt file

wc rahim.txt -->word count in rahim.txt
wc -w rahim.txt -->only count word in rahim.txt
wc -c rahim.txt -->only character count in rahim.txt
wc -l rahim.txt -->only line number count in rahim.txt

> vs >>
date>date.txt -->redirect date data(delete previous data) into date.txt file
date>>date.txt -->redirect date data(with previous data) into date.txt file

cp -->copy
cp -r file_want_to_copy file_where_to_copy
cp -r dummy.txt mim.txt /home/kali/Downloads

rm -->remove a file or folder
rm /home/kali/Desktop/mim.txt -->mim.txt will deleted
rm -f mim.txt --> force to remove mim.txt

sudo -->super User do

*/
