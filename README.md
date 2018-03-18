# WonderQ
A Wonderful Queuing Webapp

=========Notes for OSX and Windows Config============
-if using OSX:
    -change line 7 in ../consumer/views/view.hbs and ../producer/views/view.hbs
     /*Original*/ res.render(__dirname+'\\views\\view', {messages:db.messages});
     /*Edited*/ res.render(__dirname+'/views/view', {message:db.messages});

WonderQ is a lightweight webapp that models the behavior of Amazon's Simple Queueing System.

Stack/Frameworks:
    -Node.js
    -Express
    -Handlebars
    -Materialize
