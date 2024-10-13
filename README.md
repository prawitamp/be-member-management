# Final Project-Web Development-Surosowan Cyber Academy Batch 3
<h1 align="center">Journey</h1>
  <h2 align="center">
  Member Management</h2>
  
  <p align="center">
  This is a project to fulfill the  <a href="https://surosowancyber.or.id//"><strong>Surosowan Cyber Academy</strong></a>
 <p align="center">© 2024 - Group Project 2
  </p>

# Team Members

<br>

| Name                   |  Path              |
| ---------------------- |------------------- |
| Prawita Mepilianti     | Backend Developer  |
| Eriko Anggara          | Frontend Developer |
| Luqman Hakim Mumtaz    | Frontend Developer |


<br>

# About The Project
<p>Member Management is an API-based application used to manage community member data. This application includes features such as adding, editing, deleting, and retrieving member data. Uploaded member data, including files, will be stored in Cloudinary and MongoDB Atlas database. </p>

<br>

# Key Features
- <p>Member Data CRUD</p>
  <p>  Add, retrieve, update, and delete community member data. <p>

- <p>File Upload</p>
  <p> Upload profile images or documents using Cloudinary, which are then stored in the cloud. <p>

- <p>Data Storage</p>
  <p> Member data is stored in a MongoDB Atlas database, making it easy to access and manage. <p>

# Installation
<p>To run this project locally, follow the steps below:</p>

- <p>Clone Repository</p>
  <p> git clone <a href="https://github.com/prawitamp/be-pengelolaan-anggota.git"><strong>Github</strong></a> <p>
  <p>cd be-pengelolaan-anggota</p>

- <p>Dependencies Installation</p>
  <p>This project has several dependencies that must be installed using npm:<p>
  <p>npm install @prisma/client cloudinary cors dotenv express multer nodemon vercel<p>


- <p>Configure Environment</p>
  <p> Create a .env file and add the following variables: <p>
  <p>CLOUDINARY_URL=your-cloudinary-url</p>
  <p>MONGO_URI=your-mongodb-url</p>

- <p>Run Application</p>
  <p> Use nodemon to run the server: <p>
  <p>npm run dev</p>

# How To Use
* ### Members ###
  URL Local Route: `http://localhost:3004/v1/getAllMembers`
  
  Production URL Route: `https://be-pengelolaan-anggota.vercel.app/v1/getAllMembers`
* **[GET]** Get All Members
    
    Response:
    ```json
    {
    "status": "success",
    "message": "Members retrieved successfully",
    "data": [
        {
            "id": "6709aef6df58ef33ed38e54c",
            "name_member": "jungkook",
            "placeOfBirth": "korea",
            "birth_date": "1995-01-04T17:00:00.000Z",
            "address": "seoul",
            "phoneNumber": "0898855577",
            "hobbies": [
                "dancing",
                "singing"
            ],
            "image_url": "https://res.cloudinary.com/ddx9ksc0h/image/upload/v1728687861/images/memberImages/cukudv7tuqdoh8r4wk0n.jpg",
            "created_at": "2024-10-11T23:04:22.411Z",
            "updated_at": "2024-10-11T23:04:22.411Z"
        },
    ```
* ### Member By Id ###
  URL Local Route: `http://localhost:3004/v1/getMemberById/{id}`
  
  Production URL Route: `https://be-pengelolaan-anggota.vercel.app/v1/getMemberById/{id}`

* **[GET]** Get Specific Member
  
    Additional Route: `<:id>`

    Response:
    ```json
    {
    "status": "success",
    "message": "Member retrieved successfully",
    "data": {
        "id": "6709b0865e2309e675f93bbd",
        "name_member": "taehyung",
        "placeOfBirth": "korea",
        "birth_date": "1997-01-06T17:00:00.000Z",
        "address": "seoul",
        "phoneNumber": "089885557788",
        "hobbies": [
            "dancing",
            "singing"
        ],
        "image_url": "https://res.cloudinary.com/ddx9ksc0h/image/upload/v1728688260/images/memberImages/pamgxu58w3kcbeyl5e9i.jpg",
        "created_at": "2024-10-11T23:11:02.333Z",
        "updated_at": "2024-10-11T23:11:02.333Z"
    }
    ```
* ### Create Member ###
  URL Local Route: `http://localhost:3004/v1/createMember`
  
  Production URL Route: `https://be-pengelolaan-anggota.vercel.app/v1/createMember`
* **[POST]** Create Member


    Request: 
    ```json
    {
      "name_member": "kim so hyun",
      "placeOfBirth": "serang"
      "birth_date": "1990/05/05"
      "address": "jakarta"
      "phoneNumber": "08912345678"
      "hobbies": "acting"
      "image_url": "upload file"
    }
    ```
    
    Response:
    ```json
    {
    "status": "success",
    "message": "Post created successfully",
    "data": {
        "id": "670b34fe2ab03f2680224fa4",
        "name_member": "kim so hyun",
        "placeOfBirth": "serang",
        "birth_date": "1990-05-05T00:00:00.000Z",
        "address": "jakarta",
        "phoneNumber": "08912345678",
        "hobbies": [
            "acting"
        ],
        "image_url": "https://res.cloudinary.com/ddx9ksc0h/image/upload/v1728787710/images/memberImages/gntkrm9p4dxpemfllwke.jpg",
        "created_at": "2024-10-13T02:48:30.527Z",
        "updated_at": "2024-10-13T02:48:30.527Z"
    }
    ```

* ### Update Member ###
  URL Local Route: `http://localhost:3004/v1/updateMember/{id}`
  
  Production URL Route: `https://be-pengelolaan-anggota.vercel.app/v1/updateMember/{id}`
* **[POST]** Update Member

    Additional Route: `<:id>`

    Request:
    ```json
     {
      "name_member": "kim so hyun",
      "placeOfBirth": "cilegon"
      "birth_date": "1990/07/07"
      "address": "cilegon"
      "phoneNumber": "08234567811222"
      "hobbies": ["singing"]
      "image_url": "upload file"
    }
    ```
    Response:
    ```json
    {
    "status": "success",
    "message": "Member updated successfully",
    "data": {
        "id": "670b34fe2ab03f2680224fa4",
        "name_member": "kim so hyun",
        "placeOfBirth": "cilegon",
        "birth_date": "1990-07-07T00:00:00.000Z",
        "address": "cilegon",
        "phoneNumber": "08912345678",
        "hobbies": [
            "singing"
        ],
        "image_url": "https://res.cloudinary.com/ddx9ksc0h/image/upload/v1728788617/members/czdohvgva7muafe6pphg.jpg",
        "created_at": "2024-10-13T02:48:30.527Z",
        "updated_at": "2024-10-13T03:03:38.046Z"
    }
    ```
* **[DELETE]** Delete Specific Member
  
  URL Local Route: `http://localhost:3004/v1/deleteMember/{id}`
  
  Production URL Route: `https://be-pengelolaan-anggota.vercel.app/v1/deleteMember/{id}`
* **[DELETE]** Delete Member
  
    Additional Route: `<:id>`
    
    Response:

    ```json
    {
    "status": "success",
    "message": "Member deleted successfully",
    "data": {
        "id": "670a2a2c0a2da1840ffd92f6",
        "name_member": "ariel",
        "placeOfBirth": "citeras",
        "birth_date": "2000-04-04T00:00:00.000Z",
        "address": "jakarta",
        "phoneNumber": "089823455675",
        "hobbies": [
            "ngoding"
        ],
        "image_url": "https://res.cloudinary.com/ddx9ksc0h/image/upload/v1728719404/images/memberImages/tjtt7qg8zvywx5xwklvq.jpg",
        "created_at": "2024-10-12T07:50:04.875Z",
        "updated_at": "2024-10-12T07:50:04.875Z"
    }
    ```
