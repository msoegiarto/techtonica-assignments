# Eventonica React

made for [eventonica-react](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica-react.md) assignment and [react assessment](https://github.com/Techtonica/curriculum/blob/master/projects/react-assessment.md) 

click here for [live](https://msoegiarto-eventonica.herokuapp.com) site

# Build with

[ElephantSQL](https://www.elephantsql.com/)

[express](https://expressjs.com/)

[pg](https://node-postgres.com/)

[eventful-node](http://api.eventful.com/)

[dotenv](https://github.com/motdotla/dotenv)

[react](https://reactjs.org/)

[bootstrap](https://getbootstrap.com/)

[reactstrap](https://reactstrap.github.io/)

[axios](https://github.com/axios/axios)

# ERD

![](./readme_imgs/ERD_eventonica.png)

# Install

1. Fork and clone the repo

2. Go to the `eventonica-react` folder

2. Install dependencies by running `npm install` and `npm run client-install`

3. Create a file called `.env`. It should contain:

        PGHOST=<your_db_host>
        PGPORT=<your_db_port>
        PGNAME=<your_db_name>
        PGUSER=<your_db_user>
        PGPASS=<your_db_password>
        EVENTFUL_API_KEY=<your_eventful_api_key>

4. Database (PostgresSQL)

   Create a table called `"Users"`, `"Events"` and `"Users-Events"`

        CREATE TABLE "Users" (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL
        );

        CREATE TABLE "Events" (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            start_time TIMESTAMPTZ,
            venue_name VARCHAR(255),
            venue_address VARCHAR(255)
        );

        CREATE TABLE "Users-Events" (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES "Users" (id) ON DELETE SET NULL,
            event_id INT REFERENCES "Events" (id) ON DELETE SET NULL
        );

5. Start the application locally

   Run `npm run server` to start only the server at `localhost:5000`

   Run `npm run client` to start only the client at `localhost:3000`

   Run `npm run dev` to run both concurrently

# Screenshots

1. Home (Search events page)

    ![1](./readme_imgs/1_home.png)

2. Search Events

    ![2](./readme_imgs/2_search_event.png)

3. Search Events (not found)

    ![3](./readme_imgs/3_search_event_nf.png)

4. Save event

    ![4](./readme_imgs/4_save_event.png)

5. Save event (duplicate error)

    ![5](./readme_imgs/5_save_event_err.png)

6. View and/or delete saved events

    ![5](./readme_imgs/6_view_events.png)

7. View an event's attendees

    ![5](./readme_imgs/7_view_event_attendees.png)

8. Create, view or delete users 

    ![5](./readme_imgs/8_create_and_view_users.png)

9. View a user's events

    ![5](./readme_imgs/9_view_user_events.png)

10. Match user-event page

    ![5](./readme_imgs/10_view_match_user.png)

11. Match a user with an event

    ![5](./readme_imgs/11_match_user.png)

### Author

__Mega__
