# hero server
## run
`npm start`
## dependencies
+ node9+
+ mysql
+ npm
## api document
prefix: /api
+ <font color="green">GET</font> `/hero/all` get all heroes
+ <font color="green">GET</font> `/hero/:hid` get information of one hero
+ <font color="green">GET</font> `/heroskill/:hid` get information of a hero's skills
+ <font color="red">PUT</font> `/login` login by username and password
	+ request body: { username: "abc", password: "cdeff"}
+ <font color="blue">POST</font> `/register` register by username and password
	+ request body: { username: "bab", password: "cdeff"}