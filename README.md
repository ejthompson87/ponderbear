







Local Development
=================

Run MySQL:
* Totally new container, new DB:
  * `docker run --name mySql -e MYSQL_ROOT_PASSWORD=USER-PASSWORD -p 3306:3306 -d mysql:latest`

Run PHPMyAdmin:
* Run the docker container, linking it to the MySql container:
  * `docker run --name myadmin -d --link mySql:db -p 8080:80 phpmyadmin/phpmyadmin`


