# MicroBlog-Hub - Microservices Blogging Platform 🚀

Discover the wonders of MicroBlog-Hub, your go-to microservices-based blog application showcasing a modular architecture. With four services—Posts, Comments, Query, and Moderation—working together seamlessly, MicroBlog-Hub demonstrates the principles of scalability and modularity in a compact, educational package.

## Features

- **Modular Microservices:** Posts, Comments, Query, and Moderation—working together seamlessly.
- **Asynchronous Events:** Utilizes an Event Bus for efficient asynchronous communication.
- **User-Friendly Interface:** Simplifies the blogging process, ensuring a seamless experience for users.
- **Pending Comment Moderation:** Comments start in a pending state, awaiting moderation.

## Technologies Used

- NodeJS
- Express
- React
- Axios
- Concurrently

## Development Workflow

1. **Microservices:**
   - Run individual services with `npm start` in their respective directories.

2. **Client:**
   - Start the client-side application with `npm run start:client`.

3. **Asynchronous Events:**
   - The Event Bus handles asynchronous events for microservices communication.

4. **Concurrent Start (Optional):**
   - Alternatively, you can use the `start:all` script to start all services concurrently:

     ```bash
     npm run start:all
     ```

   - This script includes:
     - Starting the event bus.
     - Waiting for 5 seconds (assuming to allow the event bus to initialize, adjust as needed).
     - Starting other microservices and the client.


## Contribution

Feel free to explore and contribute to the MicroBlog-Hub project. If you have any questions or feedback, let's build an amazing microservices community together! 🚀📚