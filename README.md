# TeamMew.github.io

2020 Fall CS 160 Project

## DOCUMENTATION 

### Set up testing environment 

#### NBA Loop is a software that uses both a MYSQL Database and NPMs.

Our used IDE was Visual Studios but you can pick any that suits your needs best as long as it supports Node.js HTML CSS JS. 

To get Started make a pull request from master. Make sure the files are sorted accordingly. 

```
2020-fall-cs160-team-mew.github.io
│   README.md
│   All HTML files    
│
└───Public
│   └───CSS
│       │   All Css Files
│       JS
│       │   All JS Files aside from App.js
│       Images   
│       │   All Images
│   

```

Now some file dependencies go ahead and install Node make sure it is the most updated version. Next cd into the file directory and run. 

```
npm install express
npm install mysql 
```

##### MYSQL

You may use whatever MYSQL database you have already been using locally and connect your MYSQL database in app.js accordingly.
```
const connection = mysql.createConnection({
  host: 'localhost',
  port:'8889',
  user: 'root',
  password: 'root',
  Socket:'/Applications/MAMP/tmp/mysql/mysql.sock',
  database:"finalDB"
  })
```

If you want to use our method install MAMP software and turn on the MYSQL database. Instructions to install Mamp are in the following 
link: https://www.mamp.info/en/downloads/


Once set up delete the database line in the following code. 
```
const connection = mysql.createConnection({
  host: 'localhost',
  port:'8889',
  user: 'root',
  password: 'root',
  Socket:'/Applications/MAMP/tmp/mysql/mysql.sock',
  database:"finalDB"
  })
  ```
  Run
  ```
  node app.js
  ```
  and visit the links 
  
 http://localhost:3000/createdb
 http://localhost:3000/createuser

Next terminate your host and rerun it with the new mySQL connection including the database line. 
```
const connection = mysql.createConnection({
  host: 'localhost',
  port:'8889',
  user: 'root',
  password: 'root',
  Socket:'/Applications/MAMP/tmp/mysql/mysql.sock',
  database:"finalDB"
  })
  ```
  Run
  ```
  node app.js
  ```
  
  You may now visit and you have been set up locally but you do not have full functionality yet see Public API's section
  http://localhost:3000/index.html 
  
  
## API's on http://localhost:3000
  
get /createdb/ -- creates DB

get /createtable/ -- creates Table

post /createinstance/ -- creates user

get /getuserinstance/ -- returns user

post /updateuserinstance/ -- returns updated user

post /deleteuserinstance/ -- deletes user - not used in code but for personal use

## Public API's

Make a https://sportsdata.io/ free membership that comes with 20000 api calls.
and copy paste the APIKEY in the header.js file

 ```
 const APIKEY = 297249474292247;
  ```
## Software notes 

- Save all files you edit 
- Only rerun app.js for changes in app.js otherwise refresh your browser. 

## Testing 

### Postman testing 
- Download the postman testing JSON and run the tests accordingly for more information go to 
https://learning.postman.com/

### Cypress testing 
In your terminal run 

 ```
npm install cypress

  ```

Then to run the tests run 

 ```
npm run cypress

  ```
For more information on cypress as well as a beginner tutorial visit: 

https://docs.cypress.io/guides/getting-started/installing-cypress.html#Adding-npm-scripts

### Docker Image Testing 

Log in to Docker using the instructions found on https://hub.docker.com/

Next run these commands in your terminal and in the corresponding directory. 

 ```
docker login
docker build -t docker-application-build .
docker run -it -p 3000:3000 docker-application-build

  ```
  
You will now see the Docker image docker-application-build in your Docker directory!


Welcome to Team Mew!

   
























## Cypress Tests 

describe('Login Fail', () => {
    it('Visits Home Page', () => {
        cy.visit('http://localhost:3000/index.html')
        cy.get('a[id="signup"]').click()
        cy.get('a[id="formsignup"]').click()
        cy.get('p[id="resultsubmite"]').then(function($elem) {
        cy.log($elem.text())
        expect($elem.text()).to.equal("Error")
    })

})
})

describe('Login Success', () => {
    it('Visits Home Page', () => {
        cy.visit('http://localhost:3000/index.html')
        cy.get('a[id="signup"]').click()
        cy.get('input[id="emailsign"]').type('cypresstest@gmail.com')
        cy.get('input[id="passwordsign"]').type('cypresspass')
        cy.get('input[id="passwordsign2"]').type('cypresspass')
        cy.get('a[id="formsignup"]').click()
})
})
