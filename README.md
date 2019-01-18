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
+ <font color="green">GET</font> `/item/:iid` get the detail of one project
+ <font color="green">GET</font> `/item/user/:username` get all projects of a user
+ <font color="blue">POST</font> `/item` add a new project
	+ request body: { "username": "abc", "iname": "这是第三个项目", "tag": "标签2", "stime": "2017-01-17", "etime": "2017-01-18", "rschedule": 1, "unit": "章", "rtotal": 190, "icheck": 0 } which are represent the username, the name of projects, tag, start, end, whether need to record the schedule, the company of the project, the amount of the project and whether need to warn user. 
+ <font color="red">DELETE</font> `/item/:iid` delete a project