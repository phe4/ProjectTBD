# ProjectTBD
React app for team registration and schedule management

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### **Backlog**

---

#### **1. Setup & Initial Configurations**

- [x] 1.1. Set up a new React application.  
- [x] 1.2. Integrate Redux for state management.  
- [x] 1.3. Configure Firebase Realtime Database with the React application.  
- [x] 1.4. Set up Firebase authentication for role-based sign-in.

---

#### **2. User Authentication**

- [ ] 2.1. Create a Sign Up/In interface with role-based registration (Student, Teacher, Admin).  
- [ ] 2.2. Implement admin-generated email link token for teacher registration.

---

#### **3. Student Interface**

- [ ] 3.1. **Homepage**  
  - [ ] 3.1.1. Implement a search bar for events.  
  - [ ] 3.1.2. Design an event selector tab.  
  - [ ] 3.1.3. Display event cards with event details.  
- [ ] 3.2. **User Profile Page**  
  - [ ] 3.2.1. Display user-specific details.  
  - [ ] 3.2.2. Show user's event participation history.  
- [ ] 3.3. **Notification Page**  
  - [ ] 3.3.1. Display notifications about updates for events the student has joined.

---

#### **4. Teacher Interface**

- [ ] 4.1. **Homepage**  
  - [ ] 4.1.1. Display cards of events created by the teacher.  
  - [ ] 4.1.2. Implement a button to create a new event.  
- [ ] 4.2. **Profile Page**  
  - [ ] 4.2.1. Display teacher-specific details.  
- [ ] 4.3. **Notification Page**  
  - [ ] 4.3.1. Display notifications about updates for events the teacher has created.

---

#### **5. Admin Interface**

- [ ] 5.1. **Homepage**  
  - [ ] 5.1.1. Implement a search bar for events.  
  - [ ] 5.1.2. Design an event selector tab.  
  - [ ] 5.1.3. Display all event cards.  
  - [ ] 5.1.4. Implement a button to create a new event.

---

#### **6. Event Card**

- [ ] 6.1. Display event title.  
- [ ] 6.2. Show location.  
- [ ] 6.3. Display Date & time.  
- [ ] 6.4. Show event capacity.  
- [ ] 6.5. Implement a button to see attendees.  
- [ ] 6.6. Implement a discard button (visible only to the event holder or admin).

---

#### **7. Event Detail Modal**

- [ ] 7.1. Display event title.  
- [ ] 7.2. Show event details (date & time, location, capacity).  
- [ ] 7.3. List participants (organizer, attendees).  
- [ ] 7.4. Display event notes/description.  
- [ ] 7.5. Implement a close button.  
- [ ] 7.6. Implement an edit button (visible only to the event holder or admin).

---

#### **8. Create Event Modal**

- [ ] 8.1. Implement a form with the following fields:  
  - [ ] 8.1.1. Title  
  - [ ] 8.1.2. Description  
  - [ ] 8.1.3. Location  
  - [ ] 8.1.4. Datetime picker  
  - [ ] 8.1.5. Capacity  
  - [ ] 8.1.6. Sport category  
- [ ] 8.2. Implement a close button.  
- [ ] 8.3. Implement a submit button.  
- [ ] 8.4. Ensure the modal receives focus when opened.

---

#### **9. Firebase Realtime Database Integration**

- [ ] 9.1. Configure database schema for events, users, and notifications.  
- [ ] 9.2. Implement CRUD operations for events.  
- [ ] 9.3. Implement user-specific operations (e.g., join event, view own events).

---

#### **10. Testing**

- [ ] 10.1. Conduct unit tests for components.  
- [ ] 10.2. Perform integration tests for Redux actions and reducers.  
- [ ] 10.3. Execute end-to-end tests for user flows.

---
