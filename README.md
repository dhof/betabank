# Beta Bank Dev
___
#### To run in a local environment, run:

1. mongod (sudo)
2. npm start
3. gulp (to edit files)

<br>
<br>

#### With nothing pre-installed:

1. Install [Homebrew]
   - Open terminal and run...
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2. Install [Mongodb]
```
$ brew install mongodb
$ mkdir -p /data/db
```
3. Download and install [npm]
4. Download and Install [git]
5. In terminal, clone the repo then...
```
$ cd betabank/
```
6. Install node modules
```
$ npm install
```
7. Run Mongo
```
$ sudo mongod
```
8. Open a new terminal tab and run...
```
$ npm start
```
9. Open a web browser and go to localhost:3000

[Homebrew]: https://brew.sh
[Mongodb]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
[npm]: https://nodejs.org/en/download/
[git]: https://git-scm.com/downloads