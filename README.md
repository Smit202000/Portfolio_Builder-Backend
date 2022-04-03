# Portfolio_Builder-Backend

## INSTALLATION

This is a resume builder API where user fills the required data and
can get the personal portfolio webpage live in few seconds. This API
is connected with our React.js web application running live on
https://portfolio-builder-dev.netlify.app/ To use this API,

1. Clone the git repo.

2. Install required node packages by running

```bash
npm install
```

3. configure your .env file by adding following variables

   ```node.js
   MONGODB_URL                  #MongoDB connection URI
   PORT                         #PORT no where the server should run
   #Cloudinary config variables
   CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET
   # Access and refresh token secret for authentication
   ACCESS_TOKEN_SECRET
   REFRESH_TOKEN_SECRET

    # Client secret and client id for gmail config
   CLIENT_SECRET
   CLIENT_ID
   # Config variables for reset password
   REFRESH_TOKEN
   REDIRECT_URI
   VERIFY_TOKEN_SECRET
   RESET_TOKEN_SECRET
   ```

4. To run your node app:

```
npm start
```
