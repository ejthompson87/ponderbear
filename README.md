
Ponder Bear
===========

Ponder Bear is a website which accepts a question from the user and provides a creative response from a human.


*** Local Development ***

** Run MySQL: **
* Totally new container, new DB:
  * `docker run --name mySql -e MYSQL_ROOT_PASSWORD=USER-PASSWORD -p 3306:3306 -d mysql:latest`

** Run PHPMyAdmin: **
* Run the docker container, linking it to the MySql container:
  * `docker run --name myadmin -d --link mySql:db -p 8080:80 phpmyadmin/phpmyadmin`


*** To Dos ***

* Update 'SOME_PASSWORD' to your password for mysql


*** Run ***

    $ npm run-script start_local



*** Run Sass Compiler ***

    $ sass --watch styles/global.scss:public/style.css








