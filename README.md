# Recipe Finder - A Simple Food App

A seamless web app that allows for finding, saving, and sharing recipes through both a direct query and one based on image classification.

[Live demo](https://stormy-gorge-15727.herokuapp.com) (*Please note that the live demo is hosted on Heroku and it may take few minutes to start when you visit it.*)

## Introduction

Have you ever looked at a delicious dish and wondered what is the recipe? There are times when we come across food and do not know exactly what it’s called but would like to know how to make it. Our app can remedy this! With our app, users can take pictures of their food and our page will display recipes associated with the image. Users also have the option to connect with each other by displaying their favorite recipes in public recipe lists on their profiles.

## User Roles

- Guest: an anonymous user who is able to search for recipes via image or text but cannot save those recipes to a list without creating a profile and logging in. 
- App User: people who use the app to search for recipes via image or text and save/create recipes on their profile.
- Admin: moderator who has the previlage to regulate users while being able to do all the things an app user can do.

## Third-Party APIs

We combine the features of the BigOven recipe API and the Google Cloud Vision API to provide for an easy to access food classification webapp. Users can have 2 methods of inputting parameters. They can search directly for recipes based on food or food attributes. They can also input an image to gain classification information of the food then search for its information.

- Edamam Recipe API
  - https://developer.edamam.com/edamam-recipe-api
  - Search for recipes based on keywords

- Google Cloud Vision API
  - https://www.programmableweb.com/api/google-cloud-vision
  - Machine Learning based REST API that has trained models on images
  - Input parameter for the api is an image file that users can search with
  - Users will retrieve predefined categorical information on labels, properties, and web entities associated with the input


## Run Locally

- cd /node-react-starter
- npm install
- cd /client
- npm install
- cd /
- npm run dev 

The last command will run client and server concurrently

## Contributors

Fay, Robert, Shruthi and Siyan.

## Disclaimer 

This is a group project for *CS5610 Web Development* and the repository was migrated from GitHub Enterprise. For maintaining academic intergity, please do NOT reuse any code in this repository if you are working on your project for a related course.
