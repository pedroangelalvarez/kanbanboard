import React, { useState, Component, useReducer } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import "@fontsource/karla";
import moment from "moment";
import './index.css';

const StyledCardForm = styled.div`
  flex: 0 0 auto;
  background-color: #e0e0e0;
  border-radius: 8px;
  max-width: 50em;
  overflow: hidden;
  padding: 1em 1em;
  font-family: Karla;
  box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.5);

  h2 {
    color: #343a40;
    margin: 0;
    padding-top: .25em;
    border-bottom: 1px solid #aeaeae;
    padding-bottom: .75em;
  }
  
  ul {
    list-style: none;
    padding: 0;
  
    li:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`;

const StyledTextInput = styled.div`
  color: #343a40;

  label {
    display: inline;
    font-family: Karla;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    outline: none;
    border: 1px solid #ebecee;
    font-family: Karla;
    padding: 10px;
    margin: 10px 0;
  }

  input:focus {
    border-color: #64b5f6;
}
`;

const TextInput = ({ label, type = "text", id, defaultValue, ...props }) => (
  <StyledTextInput>
    {label && <label htmlFor={id}>{label}</label>}
    <input id={id} type={type} defaultValue={defaultValue} {...props} />
  </StyledTextInput>
);

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
        usuariosDisponibles: [],
        TIDisponibles: [],
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
          //this.setState({ data: result['data']})
          console.log(result);
          //obtener keys del objeto result
          var keys = Object.keys(result);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = result[key];
            this.setState({ [key]: value });
          }
          this.setState({ isLoading: false });
      })
      .catch((error) => {
          console.log('Error: ', error);
          //window.location.href="/";
      });

      fetch('/getusuarios', {
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
          var keys = Object.keys(result['data']);
          console.log("-------------------")
          //crear arreglo
          var usuarios = [];
          var tiusuarios = [];
          for (var i = 0; i < keys.length; i++) {
            var value = result['data'][i]['area'].toString().toUpperCase();
            if (value === "SISTEMAS"){
              tiusuarios.push(result['data'][i]);
            }
            console.log(result['data'][keys[i]]);
            usuarios.push(result['data'][keys[i]]);
          }
          this.setState({ usuariosDisponibles: usuarios});
          this.setState({ TIDisponibles: tiusuarios});
      })
      .catch((error) => {
          console.log('Error: ', error);
      });

      console.log(this.state.usuariosDisponibles);
      console.log(this.state.TIDisponibles);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const defaultValue = target.type === 'checkbox' ? target.checked : target.defaultValue;
      const name = target.name;
      
      this.setState({
        [name]: defaultValue
      });
      console.log('Change detected. State updated' + name + ' = ' + defaultValue);
    }

    handleSubmit(event) {
      alert('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
      event.preventDefault();
    }

    saveData(){

      function enviarWhatsapp(telefono,proyecto, estado){
        console.log("Enviando mensaje a: "+telefono);
        var data = JSON.stringify({
          "messaging_product": "whatsapp",
          "recipient_type": "individual",
          "to": telefono,
          "type": "text",
          "text": {
            "preview_url": false,
            "body": "Hola, el ticket T000"+proyecto+" ha cambiado de estado: "+estado
          }
        });
        
        var config = {
          method: 'post',
          url: 'https://graph.facebook.com/v13.0/103358309167301/messages',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer EAAGz0nuJUccBAHftEbT3TyoUYn3ZAxR0VZA176Ei3LXKin0YUssMYKxWwIRKeFVxKuzqWGTHW98UOYVr7sjAZBATPFkFZAxgnVETQ0iDfNZBm1ukPazuYCHbiuxa7d632iZBoFuMurhfv6DJX5emBfTJ4B1iJvOR5UoNxwnZBv01vPolQLQER2y'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      var jsonObject = {
        "transDate": this.state.transDate,
        "transTime": this.state.transTime,
        "status": this.state.status,
        "priority": this.state.priority,
        "complexity": this.state.complexity,
        "description": this.state.description,
        "tipo": this.state.tipo,
        "solicitante": this.state.solicitante,
        "asignado": this.state.asignado,
        "responsable": this.state.responsable,
        "incidenteId": this.state.incidenteId,
      };
      if(this.state.status === "Completado" || this.state.status === "Cancelado"){
        jsonObject = {
          "transDate": this.state.transDate,
          "transTime": this.state.transTime,
          "status": this.state.status,
          "priority": this.state.priority,
          "complexity": this.state.complexity,
          "description": this.state.description,
          "tipo": this.state.tipo,
          "solicitante": this.state.solicitante,
          "asignado": this.state.asignado,
          "responsable": this.state.responsable,
          "incidenteId": this.state.incidenteId,
          "closeDate": moment().format('YYYY-MM-DD'),
          "closeTime": moment().format('HH:mm:ss')
        };
      }
      
      console.log(this.state.solicitante);
      console.log(this.state.asignado);
      
      var axios = require('axios');
      var data = JSON.stringify(jsonObject);
      
      var config = {
        method: 'patch',
        url: '/api/tickets/'+this.state.id,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        enviarWhatsapp(this.state.solicitante,this.state.id,this.state.status);
      })
    .catch(function (error) {
        console.log(error);
      });



      jsonObject = {
        "status": this.state.status,
        "priority": this.state.priority,
        "complexity": this.state.complexity,
        "asignado": this.state.asignado,
        "responsable": this.state.responsable,
      };
      if(this.state.status === "Completado" || this.state.status === "Cancelado"){
        jsonObject = {
          "status": this.state.status,
          "priority": this.state.priority,
          "complexity": this.state.complexity,
          "asignado": this.state.asignado,
          "responsable": this.state.responsable,
          "closeDate": moment().format('YYYY-MM-DD'),
          "closeTime": moment().format('HH:mm:ss')
        };
      }
      console.log(jsonObject);
      data = JSON.stringify(jsonObject);
      
      config = {
        method: 'patch',
        url: '/api/incidentes/'+ticket.incidenteId,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
    .catch(function (error) {
        console.log(error);
      });

    }

    render() {

      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
  
      function formatDate(date = new Date()) {
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate())
        ].join('-');
      }
      
      function zfill(number, width) {
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */ 
        var zero = "0"; /* String de cero */  
        
        if (width <= length) {
            if (number < 0) {
                 return ("-" + numberOutput.toString()); 
            } else {
                 return numberOutput.toString(); 
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString()); 
            }
        }
      }

      

      return (
        <div>
          <StyledCardForm >
    <h2>{"TICKET T"+zfill(this.state.id,5)}</h2>
    <form>
    <ul style={{'listStyleType': 'none',  'display': 'inline-block', 'height': '70px'}}>
        <li style={{'minWidth': '5em','display': 'inline-block'}}>
          <TextInput
            label="Fecha"
            id="transDate"
            type="date"
            defaultValue={this.state.transDate}
            placeholder={formatDate()}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            minLength="1"
            maxLength="20"
            width = "2em"
            required
          />
        </li>
        <li style={{'minWidth': '5em', 'margin': '0 0.5em','display': 'inline-block'}}>
          <TextInput
            label="Hora"
            id="TransTime"
            type="time"
            defaultValue={this.state.transTime}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            //placeholder="**** **** **** ****"
            minLength="1"
            maxLength="20"
            width = "2em"
            required
          />
        </li>
      </ul>
      <ul style={{'minWidth': '40em', 'display': 'inline-block', 'height': '70px'}}>
        <li style={{'maxWidth': '10em', 'display': 'inline-block'}}>
          <TextInput
            label="Estado"
            id="status"
            type="text"
            list="listaEstados"
            autoComplete="on" 
            defaultValue={this.state.status}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Estado"
            minLength="4"
            maxLength="12"
            required
          />
          <datalist id="listaEstados">
            <option value="Pendiente"></option>
            <option value="Asignado"></option>
            <option value="En Progreso"></option>
            <option value="Completado"></option>
            <option value="Cancelado"></option>
          </datalist>

        </li>
        <li style={{'maxWidth': '10em', 'margin': '0 0.5em','display': 'inline-block'}}>
          <TextInput
            label="Prioridad"
            id="priority"
            type="text"
            list="listaPrioridades"
            autoComplete="on" 
            defaultValue={this.state.priority}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Prioridad"
            minLength="4"
            maxLength="6"
            width = "1.5em"
            required
          />
          <datalist id="listaPrioridades">
            <option value="Alto"></option>
            <option value="Medio"></option>
            <option value="Bajo"></option>
          </datalist>
        </li>
        <li style={{'maxWidth': '10em', 'margin': '0 0.5em','display': 'inline-block'}}>
          <TextInput
            label="Complejidad"
            id="complexity"
            type="text"
            list="listaComplejidades"
            autoComplete="on" 
            defaultValue={this.state.complexity}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Complejidad"
            minLength="4"
            maxLength="6"
            width = "1.5em"
            required
            />
          <datalist id="listaComplejidades">
            <option value="Alta"></option>
            <option value="Media"></option>
            <option value="Baja"></option>
          </datalist>
        </li>
        </ul>
        <ul>
        <li>
          <TextInput
            label="Descripción"
            id="description"
            type="text"
            defaultValue={this.state.description}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Descripción"
            minLength="2"
            maxLength="20"
            width = "1.5em"
            required
          />
        </li>
        <li>
          <TextInput
            label="Tipo"
            id="tipo"
            type="text"
            list="listaTipos"
            defaultValue={this.state.tipo}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Tipo"
            minLength="2"
            maxLength="8"
            required
          />
          <datalist id="listaTipos">
            <option value="Red"></option>
            <option value="Software"></option>
            <option value="Hardware"></option>
          </datalist>
        </li>
        <li>
          <TextInput
            label="Solicitante"
            id="solicitante"
            type="text"
            defaultValue={this.state.solicitante}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Solicitante"
            minLength="2"
            maxLength="10"
            required
          />
        </li>
        <li>
          <TextInput
            label="Asignado"
            id="asignado"
            type="text"
            defaultValue={this.state.asignado}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Asignado"
            minLength="2"
            maxLength="10"
            required
          />
        </li>
        <li>
          <TextInput
            label="Responsable"
            id="responsable"
            type="text"
            defaultValue={this.state.responsable}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Responsable"
            minLength="2"
            maxLength="10"
            required
          />
        </li>
        <li>
          <TextInput
            label="Incidente ID"
            id="incidenteId"
            type="autocomplete"
            defaultValue={this.state.incidenteId}
            onChange={e => this.setState({[e.target.id]: e.target.value})}
            placeholder="Incidente ID"
            minLength="2"
            maxLength="6"
            />
        </li>
        <li>
          <input type="button" value="Guardar"  onClick={(e)=> {this.saveData()}}  />
        </li>
      </ul>
    </form>
  </StyledCardForm>
        </div>
      )
    }
}
