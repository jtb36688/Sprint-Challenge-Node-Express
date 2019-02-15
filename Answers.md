- [ ] Mention two parts of Express that you learned about this week.
Express features views, which provide a way to dynamically display HTML on a server, and allows this to be done with other programming languages.
Express features routing, which allows us to further control our request handlers by seperating them amongst different URLs, or "endpoints".


- [ ] Describe Middleware?
In Express, middleware are functions that control data that is being transferred between as client and a server. Operates on the res and req. Often represented as an array of functions in Express.

- [ ] Describe a Resource?
In terms of REST, every separate piece of media that we use to create our web App is a resource. It is suggested that these are seperated into seperate URLs.

- [ ] What can the API return to help clients know if a request was successful?
A status code in the 200 block will inform clients that a http request is successful. A JSON object representing the new changes can also be sent.

- [ ] How can we partition our application into sub-applications?
In terms of express, routes can separate our app into different sub-apps. With routing, the app is represented by seperate URLs with different functionality.