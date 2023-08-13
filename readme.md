# Project: bootcamp api
Bootcamp Api

simple api for your bootcamps and courses
# 📁 Collection: Bootcamps 


## End-point: add a bootcamp
Description: Adds a new bootcamp

Required params: none

Possible Queries: none

Required Data: name(required, unique), description, website, phone, email, address(required), careers(required), photo, housing, job assitance, job guaranteee, accept Gi

Authorization: needed

Access Level: publisher, admin
### Method: POST
>```
>/api/v1/bootcamps/
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "name": "Devcentral Bootcamp",
    "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
    "website": "https://devcentral.com",
    "phone": "(111) 111-1111",
    "email": "enroll@devcentral.com",
    "address": "45 Upper College Rd, Kingston, RI 02881-2003, US",
    "careers": [
        "Web Development",
        "UI/UX",
        "Business"
    ],
    "housing": true,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get all bootcamps
Description: Fetchs all bootcamps data from database

Required params: none

Possible Queries: select, sort, page(returns the desired page considering the limit), limit(limits the number of returned resources)

Required Data: none

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/bootcamps?sort=name&page=2&limit=2&select=name
>```
### Query Params

|Param|value|
|---|---|
|sort|name|
|page|2|
|limit|2|
|select|name|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get a bootcamp
Description: Fetches a single bootcamp from database

Required params: Bootcamp id

Possible Queries: none

Required Data: none

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/bootcamps/5d725a037b292f5f8ceff787
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: getBootcampsByRadius
Description: Returns all bootcamps in certain radius

Required params: Zipcode, Range, Unit(optional)

Possible Queries: none

Required Data: none

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/bootcamps/radius/02118/1000/km
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update a bootcamp
Description: Updates a bootcamp

Required params: Bootcamp id

Possible Queries: none

Required Data: new data(optional)

Authorization: needed

Access Level: publisher(owner), admin
### Method: PUT
>```
>/api/v1/bootcamps/5d725a037b292f5f8ceff787
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "name": "new name",
    "description": "new desc",
    "location": "new location"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add a photo for a bootcamp
Description: Adds a photo to desired bootcamp

Required Params: Bootcamp id

Possible Queries: none

Required Data: img file

Authorization: needed

Access Level: publisher(owner), admin
### Method: PUT
>```
>/api/v1/bootcamps/5d713a66ec8f2b88b8f830b8/photo
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body formdata

|Param|value|Type|
|---|---|---|
|file|/C:/Users/mohammad/Downloads/download.png|file|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete a bootcamp
Description: Deletes a bootcamp

Required Params: Bootcamp id

Possible Queries: none

Required Data: none

Authorization: needed

Access Level: publisher(owner), admin
### Method: DELETE
>```
>/api/v1/bootcamps/5d713a66ec8f2b88b8f830b8
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Courses 


## End-point: create a new course
Description: Creates a new course in given bootcamp

Required Params: Bootcamp id

Possible Queries: none

Required Data: title, description, weeks, tuition, minimum skill, scholarship available(optional)

Authorization: needed

Access Level: publisher, admin
### Method: POST
>```
>/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/courses
>```
### Body (**raw**)

```json
{
    "title": "Web Design & Development 3",
    "description": "Get started building websites and web apps with HTML/CSS/JavaScript/PHP. We teach you",
    "weeks": "10",
    "tuition": 9000,
    "minimumSkill": "beginner",
    "scholarshipAvailable": "false"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get all courses
Description: Returns all available courses

Required Params: none

Possible Queries: select, sort, page(returns the desired page considering the limit), limit(limits the number of returned resources)

Required Data: none

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/courses?sort=title&page=2&limit=2
>```
### Query Params

|Param|value|
|---|---|
|sort|title|
|page|2|
|limit|2|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get all courses in a bootcamp
Description: Returns all courses of a specified bootcamp

Required Params: Bootcamp id

Possible Queries: select, sort, page(returns the desired page considering the limit), limit(limits the number of returned resources)

Required Data: none

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/bootcamps/5d713995b721c3bb38c1f5d0/courses?select=title&sort=title&limit=2&page=2
>```
### Query Params

|Param|value|
|---|---|
|select|title|
|sort|title|
|limit|2|
|page|2|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get single course
Description: Returns a single course

Required Params: Course id

Possible Queries: none

Required Data: none

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/courses/5d725a4a7b292f5f8ceff789
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update a course
Description: Updates a course

Required Params: Course id

Possible Queries: none

Required Data: new data(optional)

Authorization: needed

Access Level: publisher(owner), admin
### Method: PUT
>```
>/api/v1/courses/5d725ce8c4ded7bcb480eaa3
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "tuition": 100,
    "minimumSkill": "new minimumSkill",
    "title": "new title",
    "description": "new description"
    
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete a course
Description: Deletes a course

Required Params: Course id

Possible Queries: none

Required Data: none

Authorization: needed

Access Level: publisher(owner), admin
### Method: DELETE
>```
>/api/v1/courses/5d725a4a7b292f5f8ceff789
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Authentication 


## End-point: register
Description: Registers a new user

Required Params: none

Possible Queries: none

Required Data: name, email(unique), password (all required)

Authorization: not needed

Access Level: public
### Method: POST
>```
>/api/v1/auth/register
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer |


### Body (**raw**)

```json
{
    "name": "new user",
    "email": "newuser@gmail.com",
    "password": 123456
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: login
Description: Logins a user

Required Params: none

Possible Queries: none

Required Data: email, password (both required)

Authorization: not needed

Access Level: public
### Method: POST
>```
>/api/v1/auth/login
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "email": "newuser@gmail.com",
    "password": 123456
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: forgot password
Description: Manges the forgot password requests and sends the reset password link to users

Required Params: none

Possible Queries: none

Required Data: email(required)

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/auth/forgotpassword
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "email": "newuser@gmail.com"
    
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: reset password
Description: Resets the users password with the received token

Required Params: Reset password token

Possible Queries: none

Required Data: new password(required)

Authorization: not needed

Access Level: public
### Method: POST
>```
>/api/v1/auth/resetpassword/cc412a488cddc60b6353
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "newPassword": "123456"
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: logout
Description: Logouts the user

Required Params: none

Possible Queries: none

Required Data: none

Authorization: needed

Access Level: public
### Method: GET
>```
>/api/v1/auth/logout
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Me 


## End-point: get me
Description: Returns the logged in user profile

Required Params: none

Possible Queries: none

Required Data: none

Authorization: needed

Access Level: public
### Method: GET
>```
>/api/v1/me
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json

```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update details
Description: Updates user details like email and name

Required Params: none

Possible Queries: none

Required Data: new data (optional)

Authorization: needed

Access Level: owner(publisher or user), admin
### Method: PUT
>```
>/api/v1/me/updatedetails
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "name": "new name",
    "email": "new email"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update password
Description: Changes your current password

Required Params: none

Possible Queries: none

Required Data: old password, new password (both required)

Authorization: needed

Access Level: owner(publisher or user), admin
### Method: PUT
>```
>/api/v1/me/updatepassword
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "oldPassword": "123456",
    "newPassword": "123456"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Users 


## End-point: create user
Description: Creates a new user

Required Params: none

Possible Queries: none

Required Data: name, email(unique), password (all required)

Authorization: needed

Access Level: admin
### Method: POST
>```
>/api/v1/users
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "name": "new user",
    "email": "newuser@gmail.com",
    "password": "123456"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get users
Description: Rerurns all users

Required Params: none

Possible Queries: select, sort, page(returns the desired page considering the limit), limit(limits the number of returned resources)

Required Data: none

Authorization: needed

Access Level: admin
### Method: GET
>```
>/api/v1/users?sort=name&page=2&limit=2
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Query Params

|Param|value|
|---|---|
|sort|name|
|page|2|
|limit|2|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get a single user
Description: Returns a user

Required Params: User id

Possible Queries: none

Required Data: none

Authorization: needed

Access Level: admin
### Method: GET
>```
>/api/v1/users/5d7a514b5d2c12c7449be042
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update user
Description: Updates the user data

Required Params: User id

Possible Queries: none

Required Data: name, email, password (all optional)

Authorization: needed

Access Level: admin
### Method: PUT
>```
>/api/v1/users/5d7a514b5d2c12c7449be042
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "name": "new name"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete user
Description: Deletes a user

Required Params: User id

Possible Queries: none

Required Data: none

Authorization: needed

Access Level: admin
### Method: DELETE
>```
>/api/v1/users/5d7a514b5d2c12c7449be043
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Reviews 


## End-point: create a review
Description: Creates a review for a bootcamp

Required Params: Bootcamp id

Possible Queries: none

Required Data: title, text, rating (all required)

Authorization: needed

Access Level: user, admin
### Method: POST
>```
>/api/v1/bootcamps/64d5ea21452bb6315b9a0415/reviews
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "title": "review 1!",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra feugiat mauris id viverra. Duis luctus ex sed facilisis ultrices. Curabitur scelerisque bibendum ligula, quis condimentum libero fermentum in. Aenean erat erat, aliquam in purus a, rhoncus hendrerit tellus. Donec accumsan justo in felis consequat sollicitudin. Fusce luctus mattis nunc vitae maximus. Curabitur semper felis eu magna laoreet scelerisque",
    "rating": "3"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get all reviews
admin only

Description: Rerurns all available reviews

Required Params: none

Possible Queries: select, sort, page(returns the desired page considering the limit), limit(limits the number of returned resources)

Required Data: title, text, rating (all required)

Authorization: not needed

Access Level: admin
### Method: GET
>```
>/api/v1/reviews?sort=title&select=title&limit=2&page=1
>```
### Query Params

|Param|value|
|---|---|
|sort|title|
|select|title|
|limit|2|
|page|1|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get reviews of a bootcamp
Description: Returns all reviews of a bootcamp

Required Params: Bootcamp id

Possible Queries: select, sort, page(returns the desired page considering the limit), limit(limits the number of returned resources)

Required Data: none

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/bootcamps/5d725a037b292f5f8ceff787/reviews?sort=title&select=title&limit=2&page=1
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Query Params

|Param|value|
|---|---|
|sort|title|
|select|title|
|limit|2|
|page|1|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get a single review
Description: Returns a single review

Required Params: Review id

Possible Queries: none

Required Data: none

Authorization: not needed

Access Level: public
### Method: GET
>```
>/api/v1/reviews/5d7a514b5d2c12c7449be026
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update review
Description: Updates a review

Required Params: Review id

Possible Queries: none

Required Data: new data(optional)

Authorization: needed

Access Level: user(owner), admin
### Method: PUT
>```
>/api/v1/reviews/64d4b99770773d918d9f9482
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### Body (**raw**)

```json
{
    "title": "new title"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete review
### Method: DELETE
>```
>/api/v1/reviews/64d4b99770773d918d9f9482
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-type|Application/json|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token||string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
