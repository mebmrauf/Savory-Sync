Use this as Database -
MONGO_URL=mongodb+srv://savorySync:gwvnXeBho7kQTFtu@savorysync.vblbx.mongodb.net/?retryWrites=true&w=majority&appName=savorySync

Create Package.json file
```
npm init -y
```
Install Nodemon
```
npm install nodemon -D
```

Install ExpressJS, Mongoose, dotenv
```
npm install express mongoose dotenv
```

Install MongoDB
```
npm install mongodb
```

Use to run the project
```
npm run dev
```

Edit and add this in Package.json file
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node backend/app.js"
  },
  "type": "module",

