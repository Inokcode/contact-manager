import AddContact from "./AddContact";
import "./App.css";
import ContactList from "./ContactList";
import Header from "./Header";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";

// const contact = [
//   {
//     id: "111",
//     name: "ABC",
//     email: "test@test.com",
//   },
//   {
//     id: "222",
//     name: "DEF",
//     email: "test@test.com",
//   },
// ];

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setcontacts] = useState([]);
  const addContact = (contact) => {
    console.log(contact);
    // setcontacts([...contacts, contact]);
    setcontacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) {
      setcontacts(retriveContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(newContactList);
  };

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          {/* <Route
            exact
            path="/"
            component={() => (
              <ContactList
                contacts={contacts}
                getContactId={removeContactHander}
              />
            )}
          /> */}

          <Route
            exact
            path="/"
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContact} />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />

          {/* <AddContact addContactHandler={addContact} /> */}
          {/* <ContactList contacts={contacts} getContactId={removeContactHander} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
