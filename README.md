## Fund Me Comparisons
http://jonathongarrett.com/fund_me

## Tech Stack
Fund Me Comparison server is powered by the following,
* Node
* Express
* MongoDB
* Morgan
* Passport
* BcryptJS
* JSONWebToken


|     Action    |     Path      |
| :-------------: | :-------------: |
|     User      |     ec2-3-17-180-249.us-east-2.compute.amazonaws.com:8080/User            |
|     Login     |     ec2-3-17-180-249.us-east-2.compute.amazonaws.com:8080/Login           |
|     Query     |     ec2-3-17-180-249.us-east-2.compute.amazonaws.com:8080/Query           |
|  Kickstarter  |     ec2-3-17-180-249.us-east-2.compute.amazonaws.com:8080/Kickstarter     |
|   Indiegogo   |     ec2-3-17-180-249.us-east-2.compute.amazonaws.com:8080/Indiegogo       |


## User
POST request to endpoint /User for creating a new user document.
It accepts the following body.
```
    username,
    password
```

## Login
POST request to endpoint /Login for fetching a users auth token.
It accepts the following body.
```
    username,
    password
```

## Query
POST request to endpoint /Query for creating a new query suggestion.
It accepts the following body.
```
    title,
    description
```

## Kickstarter
GET request to endpoint /Kickstarter for fetching Kicktarter data
It accepts the following parameters.
```
    value
```
Value is the selected category (will be changing to category later)

## Indiegogo
GET request to endpoint /Indiegogo for fetching Indiegogo data
It accepts the following parameters.
```
    value
```
Value is the selected category (will be changing to category later)

