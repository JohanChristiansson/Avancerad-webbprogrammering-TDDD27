Deplyed website:
https://typewizard.vercel.app/

Project Screencast:
https://www.youtube.com/watch?v=gBWQtI4ilFY&t=3s

Individual Screencast:
Gustav Jacobsson, gusja751: https://www.youtube.com/watch?v=d8MPypldgXc
Johan Christiansson, https://vimeo.com/953350493: 


Project vision:
A web application where the user can test and train their typing skills, as well as challenge friends to a “typing-battle”. The application is clean, responsive, and easy to use.

Game specification:
The application generates X random words from a set dictionary. These are displayed to the user, and the goal is to write the words correctly as fast as possible. Written words are marked as correct or incorrect, and by the end of the round the user’s WPM (word per minute) is displayed. The game is inspired by existing games such as “TypeRacer”.


Core functions:
There will be a single player mode that can be used for practice.
A multiplayer mode in which friends can be invited to either by using a friend list on the website or by link.
It should be possible to create an account on the application. 
The user should be able to view past performances on their profile if they have created an account
Graphical elements on the dome should be rendered using server rendering as much as possible.

Technical specifications:
The following frameworks are used in the project:

	React - NextJS (Typescript)
	Node
	PostGreSQL

These frameworks were chosen since they are commonly used. We thought these frameworks could be useful to know, and there is also a lot of online documentation available. 
Next.js is a React framework that provides a robust structure. It offers features like server-side rendering (SSR), which we find to be very interesting and want to use for this application.  
Node.js: Since both Next.js and Node.js are based on JavaScript, you can share code between the client and server, enabling a more streamlined development process. It will primarily be used for the game itself, in which it is very important that different clients can communicate efficiently together and for this we believe we will need a proper backend to ensure this. Most likely by using websockets. 
PostgreSQL:
 Relational Database: PostgreSQL is a powerful and highly reliable open-source relational database management system. It offers features such as ACID compliance, data integrity, and support for complex queries, making it suitable for a wide range of applications.
Scalability and Performance: PostgreSQL is capable of handling large datasets and high transaction volumes. With proper indexing and optimization, it can provide excellent performance even for complex queries. Although this will most likely not be needed as we believe our database will be fairly simple. Another big reason to use this is that nextJS seems to integrate with PostgreSQL very easily which will allow us to put more effort in the rest of the application.
During our preliminary plan PostgreSQL will communicate with our frontend to maintain and update information about our users.
