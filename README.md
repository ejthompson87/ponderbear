
Ponder Bear
===========

Ponder Bear is a website which accepts a question from the user and provides a creative response from a human.

See ponderbear live here: http://www.askponderbear.com/

## Local Development 

## Dependecies 

Install dependencies from package.json file.  

    $ npm install 

Dependencies include: 
* Sass
* Express
* Mustache
* fs
* mySql

Middle-ware
* Session
* BodyParser

## Run MySQL using Docker: 

1.  Follow instructions to install Docker - https://docs.docker.com/engine/installation/

2.  Setup new docker container with mySql image 

    $ `docker run --name mySql -e MYSQL_ROOT_PASSWORD=SOME-PASSWORD -p 3306:3306 -d mysql:latest`

    NOTE: SOME-PASSWORD = create and insert your own password - need to update in server.js (two places to update in dbSetup function)

    // -e sets environment variables 
    // MYSQL_ROOT_PASSWORD - to set root password
    // mysql:latest - this is the mysql image (version is latest)

3.  Run PHPMyAdmin to make changes to the database 

    * start new docker container and link to mySql container

    $ `docker run --name myadmin -d --link mySql:db -p 8080:80 phpmyadmin/phpmyadmin`

## Run 

    $ npm run-script start_local

## Setup admin user 

1. Create a login on ponderbear that you intend to use as the admin user

2. Go to PHPMyAdmin url - localhost:8080

3. Login using credentials created in mySql containter
    * username: root 
    * password: SOME-PASSWORD

4. Go to 'ponderbear' database and select 'users' table

5. Edit your user so that 'is_admin' = 1

6. When logged in as an admin user, you now have access to http://www.askponderbear.com/admin.  You can respond to Ponder Bear requests here. 
           

## Run Sass Compiler 

* Make style changes to scss files

* To 'watch' scss files for changes and have these automatically update in style.css file - use command below:

    $ sass --watch styles/global.scss:public/style.css









