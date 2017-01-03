# Installing rechat
This document is a guide on how to install and run the rechat software
on your own local machine. This guide could work for hosting provides such 
as Heroku or AWS aswell but some knowledge of those tools might be needed since
some tweaking is required.

We recommend that you use an Ubuntu server to have the best experience
installing this software. Instructions for Windows are provided but not guaranteed to work.

## Dependencies
There are some dependencies needed on your machine to run the software.
* [Node JS > 6.9.1](https://nodejs.org/en/)
* [PostgreSQL > 9.3.x](https://www.postgresql.org/)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [OPTIONAL: pgAdmin](https://www.pgadmin.org/) - dbms for postgres

## Prerequesites
We use Amazon S3 for static file storage such as images and other files. Therefor,
an account there is needed.
1. [Create an AWS account](https://aws.amazon.com/s3/pricing/)
2. [Create a bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)

Amazon provides good documentation for their web services so this should be trivial.

## Downloading
Either download and unzip the source code of this repository or clone it.

## Installing
### Ubuntu 
If you want to run the software on a Ubuntu server, the easiest way 
to install all the packages that this software is dependant on is to run the installation
script provided under `tools/`. You might need to make the script runnable first.

Make sure you are in the root directory of the repository!

```sh
./tools/install.sh n # or provide y as argument to install using yarn
```

You can also manually go to each folder and install the dependencies for the server and the client 
separately

```sh
cd server && npm install # installs server deps
cd ../ui && npm install  # install client deps
cd ../ && npm install    # installs shared deps
```
### Windows
The shell script wont work on windows, but follow the instructions for the manual installation 
under for Linux.

## Setting up the database 
Rechat uses a PostgreSQL database. Either set one up on your own machine 
or host one in the cloud.

### Setting up your own PostgreSQL database
We recommend these guides to set up your own PostgreSQL database.
* [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04)
* [Windows](https://doc.odoo.com/install/windows/postgres/)
### Hosting in the cloud.
You can also host your database with some hosting provider in the cloud.
[ElephantSQL provides PostgreSQL as a service](https://www.elephantsql.com/)

### Creating the tables
A user with permissions with CRUD-permissions will have to be created in order
for the server to connect to the database. Create a database for your application
and set the correct permissions. 

When the database is running you need to run all migrations.

```sh
cd server
npm run migrate
```
## Setting enviroment variables
For the application to run correctly, it needs to know some enviroment variables.

* **REACT_APP_API_URL** - the url to the api
* **S3_ACCESS_KEY** - acces key to Amazon AWS S3
* **S3_SECRET** - your S3 secret
* **S3_REGION** - region of your S3 bucket
* **PORT** - server port - defaults to 8000
* **DB_USER** - username for database user
* **DB_PW** - password for database user
* **DB_NAME** - name of the database
* **DB_HOST** - the database host url
* **BUCKET_URL** - url of the S3 Bucket
* **JWT_SECRET** - a secret to encode json web tokens

## Running the application
Now everything should be set up and the application is ready to be run.
Follow these commands to start it up.

Make sure you are in the root directory of the application!

### Server

```sh
cd server
npm run build # compiles the server code to es5
npm run serve # starts the server
```

### Client
We recomment hosting the client on github pages! This is not necessary though,
just serving the build folder from your server is enough!

#### Github pages
```sh
cd ui
npm run deploy
```
#### Building and serving from your server

```sh
cd ui
npm run build
```
Then grab the `build/` folder and serve it with an http-server.

## First time setup
An admin-account is needed for the application.
* Go to the host of the client part and register the account you want to become admin.
* Open up PgAdmin (or some other dabase management system) and set the flag `admin` to true on that account.






