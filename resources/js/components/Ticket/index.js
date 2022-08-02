import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import axios from 'axios';
import Swal from 'sweetalert2'
import './index.css';

//Componente que recibe el id del ticket y lo muestra en pantalla
export default class Ticket extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        id: 0,
        transDate: '',
        transTime: '',
        status: '',
        priority: '',
        complexity: '',
        description: '',
        tipo: '',
        solicitante: '',
        asignado: '',
        responsable: '',
        incidenteId: '',
        data: [],
        draggedOverCol: 0
      };

      this.handleChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var server_request_uri = location.pathname + location.search;
      var ticketid = server_request_uri.substring(8,server_request_uri.length);
      console.log(ticketid);
      this.setState({ id: ticketid })
      fetch('/getticket/'+ticketid, {
        credentials: 'include'
      })
      .then((response) => {
          if (response.ok) {
              return response.json();
          } else {
              console.log('Error with session response');
          }
      })
      .then((result) => {
          // Set the state of data.
          this.setState({ data: result['data']})
          console.log(result['data']);
          this.setState({ isLoading: false });
      })
      .catch((error) => {
          console.log('Error: ', error);
      });

      console.log(this.state.data);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      this.setState({
        [name]: value
      });
      console.log('Change detected. State updated' + name + ' = ' + value);
    }

    handleSubmit(event) {
      alert('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
      event.preventDefault();
    }

    render() {
      return (
        <div>
           <h1>{"TICKET T"+this.state.id}</h1>
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="nameImput">Name</label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameImput" placeholder="Name" />
            </div>
            <div className="form-group">
              <label for="emailImput">Name</label>
              <input name="email" type="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="emailImput" placeholder="email@domain.com" />
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        </div>
      )
    }
}