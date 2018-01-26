FROM mysql:5.7

MAINTAINER jwalle

RUN usermod -u 1000 mysql

ADD my.cnf /etc/mysql/conf.d/my.cnf

CMD ["mysqld"]

EXPOSE 3306
