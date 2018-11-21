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
+ <font color="purple">PUT</font> `/user/login` login by username and password
	+ request body: { username: "abc", password: "cdeff" }
+ <font color="blue">POST</font> `/user/register` register by username and password
	+ request body: { username: "bab", password: "cdeff" }
+ <font color="green">GET</font> `/user/:username/document` get user's favorite heroes by username
+ <font color="blue">POST</font>`/user/document` add user's favorite heroes or delete user's favorite heroes
	+ request body: { username: "abcd", hid:"Annie", op: "add" } or { username: "abcd" hid: "Annie", op: "delete" }