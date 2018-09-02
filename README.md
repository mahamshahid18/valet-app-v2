# TODO's

## Server

* ~Replace mongoose with mongo db native driver to get rid of deprecation messages [mongoose downgraded to 5.2.8]~
* ~Move routes to their specific files and use router in app.js instead~
* ~Create POSTMAN tests for all endpoints~
* ~Use generic error handler~
* ~Make internal routes auth protected routes~
* ~Implement authentication and authorization~
* ~Add authentication flow for valet to generate tickets~
* ~Add issuer and audience field to auth token's header [moved to next iteration]~
* ~Add route for valet authentication~
* ~Add route for valet authorization (verification)~
* ~Add proper error objects to calls that fail due to db errors (check POST/ticket endpoint for reference)~

## Front-end

* ~Add styling to all forms~
* ~Add validation styles to all forms~
* ~Add validation checks to user login form~
* ~Add validation checks to valet login form~
* ~Add validation checks to ticket creation form~
* ~Add notification service to display info/error messages~
* ~Add route (component) for handling 401 (unauthorized request) error~
* ~Add error handler to data service to redirect to the unauthorized url when the 401 error is returned from http call~
* ~Add error handler to auth service to redirect to the unauthorized url when the 401 error is returned from http call~
* ~Add catchError calls to all methods in `DataService`~