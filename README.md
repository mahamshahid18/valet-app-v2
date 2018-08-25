# TODO's

## Server

* ~Replace mongoose with mongo db native driver to get rid of deprecation messages [mongoose downgraded to 5.2.8]~
* ~Move routes to their specific files and use router in app.js instead~
* ~Create POSTMAN tests for all endpoints~
* Use generic error handler
* ~Make internal routes auth protected routes~
* ~Implement authentication and authorization~
* Add authentication flow for valet's who generate tickets
* Send ticket_no as base64 encoded string (as route param)

## Front-end

* Decode ticket_no from base64 encoded string (when reading route params)
* Add styling to user login form
* Add validation checks to user login form
* Add validation styles to user login form
* Add notification service to display error messages (such as when a 401 message is returned from the server)