# Things

## Description
Web application for identifying the location of things.
User have "things" (e.g.: keys, smartphone, credit card) and "containers". "Things" should have description and volume fields. "Containers" should have description and volume fields.
"Things" can be put into "containers". "Containers" also can be put into other "containers". User can add, edit and remove "things" and "containers". Thing can not be put into a "container" if it does not fit or there is no capacity left.

## Technical requirements
1. Angular 2+;
2. Data should be stored in persistent storage (Should persist between user sessions);
3. Centralized state management (ngRx or similar);
4. JWT Authentication (backend requests can be mocked);
5. REST or CRUD operations (backend requests can be mocked);

## Running app

Run `npm run start-fe` for a frontend server. Dev server will work by url `http://localhost:4200/`
Run `npm run start-be` for a backend server. JSON-server will work by url `http://localhost:4201/`
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.