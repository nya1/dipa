
![DIPA logo](http://i.imgur.com/DSPlL0B.png "DIPA logo")

[![npm version](https://badge.fury.io/js/dipa.svg)](https://badge.fury.io/js/dipa)

know if a specific PID is running

Automatically expose an API about your PIDs

#### Install
```bash
$ [sudo] npm install -g dipa
```

#### Run
```bash
$ dipa
```

optional flags:
 * `--prefix [prefix]` : custom api prefix (default /api/)
 * `--port [port]` : custom port (default 8080)

you can check for any PID by going to:
```
 http://localhost:8080/api/v1/pid/{YOUR_PID}
```

example response:
```
 {"success":true,"running":true}
```

PID status is cached for 10 seconds
