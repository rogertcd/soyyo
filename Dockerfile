FROM ubuntu:latest
MAINTAINER ROGERT rogertg@msn.com
RUN apt update
RUN apt -y install nodejs
RUN apt -y install npm
expose 5000
RUN mkdir /var/www/rogweb/
CMD /var/www/rogweb/
RUN git clone https://github.com/rogertcd/soyyo.git
CMD soyyo
RUN npm start