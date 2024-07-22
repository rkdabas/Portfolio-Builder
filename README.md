# Portfolio Builder (MERN App)
 It is a fully functional platform where user can fill the details and can create portofolio of choice .The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.
 ## System Architecture
 It consists of four main components: 2 front ends (dashboard and portfolio), the back end, and the database. The platform follows a client-server architecture, with the front end serving as the client and the back end and database serving as the server.
 ### Frontend
 The frontend of the platform is build using ReactJS and Redux-toolkit. ReactJS allows for the creation of dynamic and responsive user interfaces, which are critical for providing an engaging learning experience to the students. The front end communicates with the back end using RESTful API calls.
 ### Backend
 The back end of the platform is built using NodeJS and ExpressJS,. The back end provides APIs for the front end to consume, which include functionalities such as user authentication, course creation, and course consumption. The back end also handles the logic for processing and storing the course content and user data.
 ### Database
 The database for the platform is built using MongoDB, which is a NoSQL database that provides a flexible and scalable data storage solution. MongoDB allows for the storage of unstructured and semi-structured data. The database stores the user data like project details, personal info, education details, skills etc.

 ## Architecture Diagram
 Here is a high level disagram that illustrated the architecture of portfolio builder
 ### Portfolio Front End
- Homepage: This page will have a brief introduction about the user. Like whatever data he entered in the dashboard will be reflected over here e.g coding profile links, images, cards for skills, applications & projects, timeline
- Project View: This page shows all the enetered information regarding projects like Project image, description, tech stacks, links etc.
- Contact Us: This page will allow someone to send message to the portfolio holder and the all the message details will be reflected in the dashboard.
 ### Dashboard Front End
- Homepage: This page will have a brief introduction about the all entered details in various sections. 
- Add Project: This page allows user to enter the project details and it gets saved and reflected on dashboard homepage and portfolio.
- Add Skill: This page takes skill name, skill png and skill level as input.
- Add Application: User can enter name and image of the apps he/she uses.
- Add Timeline: User can enter timeline name, description, start data, end date of the timeline for eduction and experiences.
- Messages: This page shows all the messages that are sent to the portfolio holder via portfolio frontend. User can delete and view messages here.
- Account: User can view and update all his details here like name,age,coding profile links, avatar, resume etc.
- Login: User can login with his registered emial and password only.
- Logout: User can logout of the system.
- Forgot Password: An email will be sent to the user for password updation.
- Manage Skills: User can edit and delete skills
- Manage Timeline: User can delete a particular timeline.
- Manage Projects: User can edit, view and delete any project.

### Backend
- User authentication and authorization: Students and instructors can sign up and log in to the platform using their email addresses and password. The platform also supports - OTP (One-Time Password) verification and forgot password functionality for added security.
- Cloud-based media management: StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images.
- JWT: JWT (JSON Web Tokens) are used for authentication and authorization, providing a secure and reliable way to manage user credentials.
- Bcrypt: Bcrypt is used for password hashing, adding an extra layer of security to user data.
- Mongoose: Mongoose is used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript.
  ## Data Models and Database Schema:
  This project has wide range of schemas including:
  - messageSchema: Fields such as senderName, subject, message, createdAt.
  - skillSchema: Fields such as title, proficiency, skill banner image.
  - projectSchema: Filds such as title, desctioption, gitHubLink, liveLink, technologies, tech stack, deployed, projectBanner.
  - softwareApplicationSchema: Fields such as name, banner image.
  - userSchema: Filds such as fullName, email, phone, aboutMe, password,portfolioURL, GithubURL, coding & social media profiles URL avatar, resume
  - timelineSchema: Filds such as title, description, timeline start and end data.
  ## API Design
  The API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE. Sample list of API endpoints and their functionalities:
  - ./api/v1/user/register: Create a new user 
  - ./api/v1/user/login: Log in using existing credentials and generate a JWT token.
  - ./api/v1/user/me: Get user details.
  - ./api/v1/user/update/me: Update user details
  - ./api/v1/user/update/password: Update password based on current password.
  - ./api/v1/user/password/forgot: Send an email with a password reset link to the registered email.
  - ./api/v1/timeline/add: add a timeline
  - ./api/v1/timeline/delete: delete a timeline
  - ./api/v1/timeline/getall: get all timelines details.
  - ./api/v1/skill/add: add any skill to DB.
  - ./api/v1/skill/delete/:id : delete a particular skill
  - ./api/v1/skill/update/:id : update a particular skill
  - ./api/v1/skill/getall: get all skills
  - ./api/v1/project/add: add a project to DB.
  - ./api/v1/project/delete/:id : delete any project
  - ./api/v1/project/update/:id : update any project
  - ./api/v1/project/getall: get all projects.
  - ./api/v1/project/get/:id :get any particular project.
  With this API design, Portfolio Builder will be able to provide a smooth user experience while ensuring security and stability.


