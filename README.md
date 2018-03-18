# WonderQ
A Wonderful Queuing Webapp

in command line or terminal run:
node server.js

navigate to: localhost:8000/consumer

=========Notes for OSX and Windows Config============
	-if using OSX:
    -change line 7 in:
     ../consumer/views/view.hbs  
     ../producer/views/view.hbs
     ../dev/views/view.hbs

     **Original:**

     res.render(__dirname+'\\views\\view', {messages:db.messages});

   **Edited**

     res.render(__dirname+'/views/view', {message:db.messages});

WonderQ is a lightweight webapp that models the behavior of Amazon's Simple Queueing System.

**Stack/Frameworks:**
    -Node.js
    -Express
    -Handlebars
    -Materialize

**Architecture Overview**
This project utilizes a mocked database in Node.js comprised of a database module with storage in a json object.

The API module handles requests to get messages, check-in, check-out, and create new messages.  All other calculations are implemented in middleware modules. This includes hashing ids, "database" operations, and timed operations for message expiration.

The front end has three views: one for consumers to check messages in and out, one for producers to create new messages, and one for developers to oversee all active messages.

**Scaling**
For lower volume scaling I would use Google's Firebase database to handle all queries and for pushing real-time updates.

For larger volumes, I would use Amazon Web Services to as my infrastructure to handle all requests and increasing data sizes. Parallelization and efficient indexing would allow the application to handle many requests.

Additional features for scaling would include caching some messages and only updating the cache when necessary, and creating a CDN for faster delivery times.
