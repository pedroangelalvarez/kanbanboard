import React from 'react';
import ReactDOM from 'react-dom';
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

function App() {

  var estado = "";
    return ( 
        <StyledApp>
        <select id='selector' defaultValue={"Tickets"} onChange={e => estado = e.target.value} className="form-control">
          <option value="Tickets">Tickets</option>
          <option value="Incidentes">Incidentes</option>
        </select>
        {estado === 'Incidentes' ?  <IncidentBoard />: <TicketBoard />}
        </StyledApp>
    );
}

export default App;
