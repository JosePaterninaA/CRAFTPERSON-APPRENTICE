import "./App.css";
import mentors from "../../mentors.json";

import React, { Component } from "react";
import Modal from 'react-modal';
import classNames from "classnames";
import MentorsList from "../MentorsList/MentorsList";
import Filter from "../Filter/Filter";
import Header from "../Header/Header";
import shuffle from "lodash/shuffle";
import Calendario from "../DateTimePicker/calendar.js";
// const serverEndpoint = 'http://localhost:3001';

Modal.setAppElement('#root')
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
  

class App extends Component {
  constructor(){
    super();
    this.state = {
      modalIsOpen: false,
      mentors: shuffle(mentors)
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
    console.log("ARRE PUTA");
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  handleTagSelect = async ({value: tag}) => {
    await scrollToTop();
    this.setState({
      tag
    });
  };

  handleCountrySelect = async ({value: country}) => {
    await scrollToTop();
    this.setState({
      country
    });
  };

  handleNameSelect = async ({value: name}) => {
    await scrollToTop();
    this.setState({
      name
    });
  }

  filterMentors = mentor => {
    const { tag, country, name } = this.state;
    return (
      (!tag || mentor.tags.includes(tag)) &&
      (!country || mentor.country === country) &&
      (!name || mentor.name === name)
    );
  };

  toggleFields = () => {
    this.setState({
      fieldsIsActive: !this.state.fieldsIsActive
    });
  };


   CalendarioModal = () => {
    
    return (
      <Modal 
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        { console.log("ARRIENDO PUTAS") }
        <Calendario/>
      </Modal>
    );}

  render() {
    const { mentors, fieldsIsActive } = this.state;
    const mentorsInList = mentors.filter(this.filterMentors);

    return (
      <div className="app">
        <button onClick={this.openModal}>Open Modal</button>        
        {this.CalendarioModal()}
        <Header />
        <main>
          <Filter
            onTagSelected={this.handleTagSelect}
            onCountrySelected={this.handleCountrySelect}
            onNameSelected={this.handleNameSelect}
            onToggleFilter={this.toggleFields} />
          <MentorsList
            className={classNames({
              active: fieldsIsActive
            })}
            mentors={mentorsInList}
          />
        </main>
        <footer>
          <a rel="noopener noreferrer" href="https://github.com/Coding-Coach/coding-coach/blob/develop/src/pages/static/TermsAndConditions.md#terms-and-conditions" target="_blank">Terms & Conditions</a>
          <a rel="noopener noreferrer" href="https://github.com/Coding-Coach/coding-coach/blob/develop/src/pages/static/CookiesPolicy.md#what-are-cookies" target="_blank">Cookies</a>
          <a rel="noopener noreferrer" href="https://github.com/Coding-Coach/coding-coach/blob/develop/src/pages/static/PrivacyPolicy.md#effective-date-october-03-2018" target="_blank">Privacy Policy</a>
        </footer>
      </div>
    );
  }
}

export default App;

function scrollToTop() {
  const scrollDuration = 200;
  return new Promise(resolve => {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY !== 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else {
          clearInterval(scrollInterval);
          resolve();
        }
    },15);
  });
}

