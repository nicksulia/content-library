# Content Library


## Table of contents
- [Installing the system](#installing-the-system)
- [Functions description](#functions-description)
- [Usage](#usage)
- [Possible issues](#possible-issues)

## Installing the system


First, you should install `NodeJS with npm` and  `MongoDB` on your virtual machine.
You can do this by going on their official site.

**Note** All installation scripts work on `Windows` only.

After `MongoDB` installation, you should add path to it's `bin` folder in `PATH` variable.

Then open `cmd` or any other console emulator and run 

 ```bash
mongod --dbpath $path_to_db --port $dbport
 ```
Where `$path_to_db` is path to folder where you want to init your DB and `$dbport` 
free connection port.
 
 Example:
 ```bash
mongod --dbpath C:\data\db1 --port 27001
 ```

After running `mongod` in console go into root folder of the project and change `config`
in `serverConfig.js` on yours. **Note** that you need to change `portDB` and `databaseUrl`
 when you changing default db port.
 
 Then run:
 ```bash
npm run generate-data
 ```
**Note** Some console emulators and consoles don't respond with messages,
so you better need to go and check it manually on `mongo --port $dbport`.

*Issues* Sometimes you need to create DB first and then generate and import data.
 
 If data wasn't imported, you can run command from `import.bat` adding you custom 
 parameters instead of `%{1,2,3,4}`


## Functions description

### dbMethods.js

*find* - method for surfing in DB 

*parameters:* 
- searchBy - object that can be { key: value } or { } where `key` is name of field and `value` is it's search value
- sortBy - string. Name of field
- cursor - number. Used for data pagination
- filterBy - object. { type: {string}, options: {object} }

*returns* Promise

### client-src -> helpers -> fetchAPI.js

*exports:*

- fetchAPI.get(url, options) 
- fetchAPI.post(url, body, options)
- fetchAPI.put(url, body, options)

*parameters:*
- body - object. Request.body
- url - string. Request url
- options - object. Can be { headers: {object} } or { }.
All other options properties will be ignored.

## Usage

### API routes
- `/apis` - unsecured API call for getting data
- `/register` - registration API call. Returns users credentials
- `/api/authenticate` - authentication API call. Returns `token`
- `/api/findData` - secured API call for getting data. Returns array of data
- `/api/check` - check API. Used for checking token expiration

### Scripts
To start project in development mode with auto re-build, in root folder run: 
 ```bash
npm run watch
 ```
 To build project for production, run: 
 ```bash
npm run build
 ```
  To start server, run: 
  ```bash
 npm run server
  ```
  
 ## Possible issues
 
 - Sometimes mongod instance freeze. You need to switch on it's console and run signal *ex. pressing Enter*
 - if Data have already been imported, you can't overwrite it. 
 Add in import.bat flag `--upsert` if you want to (Not recommended)