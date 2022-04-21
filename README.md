# CEN5035-SE-ParKS

Group project for Software-Engineering course (CEN5035)

## Team Members

| Name | Gatorlink Email | Responsibility | Github |
| :--: | :--: | :--: | :--: |
| Srinivas Nishant Viswanadha | viswanadha.s@ufl.edu | Frontend | <https://github.com/nishaaaaaant> |
| Suraj Mishra | mishra.suraj@ufl.edu | Backend | <https://github.com/smsuraj100> |
| Neerav Jain | jainneerav@ufl.edu | Frontend | <https://github.com/neeravjain24> |
| Tanvi Jain | tjain@ufl.edu |  Backend | <https://github.com/tjain1715> |

## Project Description

- In most of the cites there is a shortage for parking spaces and our project aims to consider this problem and provide a solution for the same.
- The project aims to provide parking spaces for users who are trying to find a parking space for a short interval of time.
- ParkS is an application that solves the problem of parking spaces. This application serves for two stake holders, users who are in search for a parking space and users who are willing to rent a parking space.
- Once the user logins, the users can view and book an already listed parking space or can list a new available parking space. Integration of maps into this application helps the users navigate to the desired parking space very easily. Users who want to list a parking space can also locate their parking space using maps.
- Once the users selectes a desired parking space, the user would be re-directed to the payment gateway for the payment of the space.

## Functionality

- There will be two types of users in our project.
    1. User who is renting their parking space.
    2. User who is trying to find a parking space.
- Account management - Sign-In and Sign-Out for the users.
- Location based listing of parking spaces.
- Availability of slots for the next 7 days.

## How to Run

Run the makefile after you clone the repsository.

```
make start #this start the frontend.
make backend #this starts the backened.
```

## Tech Stack

- React + Redux (For FrontEnd)
- GoLang (for BackEnd)
- MongoDb (Database)

## Accomplishments in Sprint-1

1. Created the Home page of the Website.
2. The homepage consists of two modules `Users who are renting a space` and `Users who are looking for a parking space`.
3. We have added Routes that render the UI into its corresponding paths.
4. Added the Registeration form where the users can register the website.
5. Added the Login component from where the users can login.
6. We have setup GoLang with fiber framework.
7. We have set up the Database in MongoDb and connected our backend.
8. We have developed a `RegistrationAPI` which helps the new users to register, which is stored in the Database.
9. We have also developed a `FetchAllUsersAPI` which will list all the registered users in the Database.
10. Video demo of the Frontend system.
11. Video demo of the Backend system.
![alt text](/videos/Sprint1.gif)

## Accomplishments in Sprint-2

1. We have developed few UI-enhancements and made the homepage with better ui chnages.
2. We have added `Maps-API` to the Renters and Buyers pages. This echnacemnet will be in-progreess from the sprint3 aswell.
3. The `Login-API` now matches the `user credentials` with the database.
4. So the fucntionality checks for credentials and verifys and sends a `success` message if the api works fine and an `error` message when the api throws an error.
5. The `Registration-API` now check if the user already exists. If such senario happens the user gets redirected to the `login-page`.
6. We have added content to `About-us` page.
7. Wer have devloped `getUserWithID-API`, `editUserAPI` and `deleteUserAPI`.
8. The `Add-new-address-API` is developed and the integration is in-progress.
9. We have developed `Get-all-addresses-API`. This api fetchs all the addresses for listing purpose.
10. We have added the `Cypress` testing framework to the project.
11. The `first-testcase` we worked on was chekcing if all the developed pages and routes work fine.
12. The `second-testcase` we worked on was testing the functionalities of the features we devloped. The `login-functinality` was tested. The `registration-functionality` has been tested. The `maps-api-loading` testcase has also been tested.
13. We have also created the `API-Documentation`.
14. Link of [Api-documentation](https://documenter.getpostman.com/view/14913015/UVkvHs9o)
15. Video demo of the Developed system.
![alt text](/videos/Sprint2.gif)
16. Video demo of the Testing the system.
![alt text](/videos/Sprint2-test.gif)

## Accomplishments in Sprint-3

1. We have developed few UI-enhancements and made the homepage with better ui chnages.
2. Integrated and developed a Map on the buyers page which has a `search` feature.
3. Time slot calender has also been integrated to the booking of a buyer.
4. Book-now and Cancel fucntionalities have also been implemented.
5. Renters form in the frontend has also been developed.
6. Developed a `mongodb` collection to store the `buyer-history`, `cart-info`, and `upcomming-bookings`. Same collection would also be used to store `rental-property-history`.
7. API has been developed to add a new add a `new-buyer-order` on a property.
8. API has been developed to get the `order-history` for a specific buyer.
9. API has been devloped to get the `cart-information` for a buyer.
10. API has been developed to get `all-renter-property-information` of a specific user.
11. API has been developed to get `all-renter-property-information` based on the coordinates(`latitude` and `logitude`).
12. API has been developed to get `all-rental-property-coordinates` which displaces a marker on the Map.
13. Unit testing all of the new integrated features has been achieved this sprint.
14. Link of [API documentation](https://documenter.getpostman.com/view/20321342/UVysvv97).
15. Video demo of the Developed system.
![alt text](/videos/Sprint3.gif)
16. Video demo of the Testing the system.
![alt text](/videos/Sprint3-test.gif)

## Accomplishments in Sprint-4

## Demo video functionality

[Demo of the application](https://www.youtube.com/watch?v=LQsSyfWaFSs)

## Cypress test video

[Frontend test cases](https://www.youtube.com/watch?v=5uoeaKICXFk)

## Backend unit test video

[Link to the backend test cases](https://www.youtube.com/watch?v=NF4Nu6lZSqU)

## Link to API Documentation

[API Documentation Link](https://documenter.getpostman.com/view/20321342/UVysvv97)

## Link to Project board

[Project Board](https://github.com/nishaaaaaant/CEN5035-SE-ParKS/projects/1)

## Sprint4 deliverables

1. Integrated maps for renters and buyers user spaces.
2. Integrated update user details functionality.
3. Integrated users booking history functionality.
4. Integrated DeleteRenterAPI.
5. Integrated EditRenterPropertyAPI.
6. Integrated GetBookedSlotsAPI.

## Link of the Hosted website

1. Link : - https://parks-39379.web.app/
2. Could not host the backend due to technical problem.