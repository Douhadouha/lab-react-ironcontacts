import React, { Component } from "react";
import "./App.css";
import contacts from "./contacts.json";

class App extends Component {
  state = {
    contacts: contacts.splice(0, 4),
    leftContacts: contacts.splice(5, contacts.length - 1)
  };

  addRandomActor = () => {
    let randomActorIndex = Math.floor(
      Math.random() * (this.state.leftContacts.length - 1)
    );
    let randomActor = this.state.leftContacts[randomActorIndex];
    // console.log([...this.state.contacts, randomActor]);

    let newContacts = [...this.state.contacts, randomActor];
    let newLeftContacts = [...this.state.leftContacts];
    newLeftContacts.splice(randomActorIndex, 1);

    this.setState({
      contacts: newContacts,
      leftContacts: newLeftContacts
    });
  };

  sortTabByName = () => {
    let contactsToSort = this.state.contacts;

    function sortName(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    let contactsSorted = contactsToSort.sort(sortName);

    this.setState({ contacts: contactsSorted });
  };

  sortTabByPop = () => {
    let contactsToSort = this.state.contacts;

    function sortPop(a, b) {
      return a.popularity - b.popularity;
    }

    let contactsSorted = contactsToSort.sort(sortPop);

    this.setState({ contacts: contactsSorted });
  };

  deleteActor = (contact, index) => {
    let newContacts = [...this.state.contacts];
    newContacts.splice(index, 1);
    let newLeftContacts = [...this.state.leftContacts, contact];
    this.setState({
      contacts: newContacts,
      leftContacts: newLeftContacts
    });
  };

  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.addRandomActor}>Add Random Contact</button>
        <button onClick={this.sortTabByName}>Sort by name</button>
        <button onClick={this.sortTabByPop}>Sort by popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={contact.pictureUrl} alt="contact picture" />
                  </td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity}</td>
                  <td>
                    <button onClick={this.deleteActor}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
