import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import TicketBoard from '../TicketBoard';
import IncidentBoard from '../IncidentBoard';
import styled from 'styled-components';

const StyledApp = styled.main`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 3em;
justify-content: space-around;

  & > div:not(:last-child) {
    margin-bottom: 2em;
  }
`
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "Tickets",
    }
  }

  render() {
    return (
      <div>
        <div>
        <select id='selector' defaultValue={"Tickets"} onChange={e => this.setState({ option: e.target.value}) } className="form-control">
          <option value="Tickets">Tickets</option>
          <option value="Incidentes">Incidentes</option>
        </select>
        <a  style={{'right':'1px', 'float': 'right'}} href={"/login"}>
         Cerrar Sesión
        </a>
        </div>
        <StyledApp>
        {this.state.option === 'Incidentes' ?  <IncidentBoard />: <TicketBoard />}
        </StyledApp>
        </div>
    );
  }
}