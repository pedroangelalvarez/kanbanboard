import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import detalles from './index.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import "@fontsource/karla";
import moment from "moment";
import {NotificationContainer, NotificationManager} from 'react-notifications';

let colorCard = "#f9fdf7";

let columnList =[
  { name: "POR HACER", stage: 1, color: "#C4E8C2" },
  { name: "ASIGNADO", stage: 2, color: "#b8bcf8" },
  { name: "EN PROGRESO", stage: 3, color: "#F8BC9A" },
  { name: "COMPLETADO", stage: 4, color: "#6BBD99" },
  { name: "CANCELADO", stage: 5, color: "#FF6B6B" }
]

let projectList = [
  {
    id:1,
    priority:1,
    name: "Project 1",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    status: 1,
    color: colorCard
  },

  { 
    id:2,
    priority:1,
    name: "Project 2",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    status: 1,
    color: colorCard
  },

  { 
    id:3,
    priority:1,
    name: "Project 3",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    status: 1,
    color: colorCard
  },

  { 
    id:4,
    priority:1,
    name: "Project 4",
    date:'2022-04-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    status: 2,
    color: colorCard
  },

  { 
    id:5,
    priority:1,
    name: "Project 5",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    status: 3,
    color: colorCard
  },

  { 
    id:6,
    priority:1,
    name: "Project 6",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    status: 3,
    color: colorCard
  },

  { 
    id:7,
    priority:1,
    name: "Project 7",
    date:'2022-04-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    status: 4,
    color: colorCard
  }
];


export default class IBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      projects: [],
      data: [],
      fechaInicio: "",
      draggedOverCol: 0,
      popupActive: false,
      statusPrevio: 0,
      incidenteActivo: 0,
      popupData: [],
      usuarios: [],
      tickets: [],
    };

    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.columns = columnList;                                       //<---------column list
    this.fechaInicio = Date.now();
  }

  /*
  async updateTicket(){

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('transDate', transDate);
    formData.append('priority', priority);
    formData.append('complexity', complexity);
    formData.append('description', description);
    formData.append('tipo', tipo);
    formData.append('solicitante', solicitante);
    formData.append('asignado', asignado);
    formData.append('responsable', responsable);
    formData.append('incidenteId', incidenteId);

    await axios.post('/api/tickets/${id}', formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      console.log(response);
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })

    alert('Saved!');
  }
  */

  ingresarPizarra(){
    //Inicializo json
    var registros = [];
    //iterar data
    for(let i = 0; i < this.state.data.length; i++) {
        let obj = this.state.data[i];
        var item = {}
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(key == "status"){
                  var estado = 1;
                  if(obj[key].toUpperCase() == "PENDIENTE"){
                    estado = 1;
                  }else if(obj[key].toUpperCase() == "ASIGNADO"){
                    estado = 2;
                  }else if(obj[key].toUpperCase() == "EN PROGRESO"){
                    estado = 3;
                  }else if(obj[key].toUpperCase() == "COMPLETADO"){
                    estado = 4;
                  }else if(obj[key].toUpperCase() == "CANCELADO"){
                    estado = 5;
                  }
                  item[key] = estado;
                }else{
                  item[key] = obj[key];
                }
                
            }
        }
        item ["color"] = colorCard;
        
        item ["id"] = obj.id;
        /*
        item ["name"] = obj.description; //"Ticket "+(obj.id).toString() 
        item ["date"] = obj.transDate;
        item ["description"] = obj.tipo;
        item ["status"] = estado;
        
        */
        console.log(item);
        registros.push(item);
    }
    this.setState({ projects: registros, isLoading: false });
  }


  componentDidMount() {

     // Retrieve project data from the database.
     fetch('/getincidentes', {
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
        this.ingresarPizarra();
    })
    .catch((error) => {
        console.log('Error: ', error);
    });

    console.log("Datos de la pizarra: ");
    console.log(this.state.data);

    //Retrieve ticket data from the database.
    fetch('/gettickets', {
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
        this.setState({ tickets: result['data']})
        console.log(result['data']);
    })
    .catch((error) => {
        console.log('Error: ', error);
    });

    // Retrieve user data from the database.
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
        this.setState({ usuarios: result['data']})
        console.log(result['data']);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    //this.setState({ projects: projectList, isLoading: false });
  }

  //this is called when a Kanban card is dragged over a column (called by column)
  handleOnDragEnter(e, stageValue) {
    this.setState({ draggedOverCol: stageValue });
    console.log(this.state.data);
    //Change cursor of mouse
    e.target.style.cursor = "move";
  }

  async updateIncidente(id, status){
    var estado = "";
    if(status == 1){
      estado = "Pendiente";
    }else if(status == 2){
      estado = "Asignado";
    }else if(status == 3){
      estado = "En Progreso";
    }else if(status == 4){
      estado = "Completado";
    }else if(status == 5){
      estado = "Cancelado";
    }
    //Crear json para enviar al servidor
    const jsonObject = {};
    jsonObject["status"] = estado;
    console.log("El incidente :" + id + " se actualizara a estado: " + estado);
    
    console.log(jsonObject);
    var axios = require('axios');
    var data = JSON.stringify(jsonObject);
    
    var config = {
      method: 'patch',
      url: '/api/incidentes/'+id,
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

  async updateAsignacion(id,asignado){
    const jsonObject = {};
    jsonObject["asignado"] = asignado;
    console.log("El incidente : "+id+" ha sido asignado a: "+asignado);
    var axios = require('axios');
    var data = JSON.stringify(jsonObject);
    var config = {
      method: 'patch',
      url: '/api/incidentes/'+id,
      headers :{
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config).then(function (response){
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error){
      console.log(error);
    }); 


  }


  enviarWhatsappConfirmacion(telefono,proyecto){
    var data = JSON.stringify({
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": +telefono,
      "type": "interactive",
      "interactive": {
        "type": "button",
        "header": {
          "type": "text",
          "text": "Ticket T00"+proyecto
        },
        "body": {
          "text": "Confirme sí su incidente ha sido resuelto"
        },
        "footer": {
          "text": "MDCG"
        },
        "action": {
          "buttons": [
            {
              "type": "reply",
              "reply": {
                "id": "slot-1",
                "title": "Resuelto T00"+proyecto+"✅"
              }
            },
            {
              "type": "reply",
              "reply": {
                "id": "slot-2",
                "title": "No resuelto T00"+proyecto+"❌"
              }
            }
          ]
        }
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
//this is called when a Kanban card dropped over a column (called by card)
  async handleOnDragEnd(e, project) {
    e.preventDefault();
      //this.setState({ statusPrevio: project.status });
    const proyectoActivo = this.state.projects.slice(0).find((entry) => {
        return entry.id === project.id;
    });
    this.setState({ statusPrevio: proyectoActivo.status });

    console.log("el incidente "+project.id+" se movio de la columna "+this.state.statusPrevio+" a la columna "+this.state.draggedOverCol);

    if (this.state.statusPrevio === this.state.draggedOverCol) {
        return;
    } else if(this.state.draggedOverCol === 1 || this.state.draggedOverCol === 5){
      const updatedProjects = this.state.projects.slice(0);
      updatedProjects.find((projectObject) => {
        return projectObject.id === project.id;
      }).status = this.state.draggedOverCol;
  
      this.setState({ projects: updatedProjects });
      console.log(this.state.projects);
      this.updateIncidente(project.id, project["status"]);

    } else if(project.asignado === "" || project.asignado === null){
      /*this.setState({ ticketActivo: project.id });
      this.setState({popupActive: true});
      console.log("Activando pop up")*/
      alert("El incidente no está asignado aún");
      NotificationManager.error('ERROR', 'El ticket no está asignado');
      console.log("El ticket no esta asignado");
    } else {
      const updatedProjects = this.state.projects.slice(0);
      updatedProjects.find((projectObject) => {
      return projectObject.id === project.id;
      }).status = this.state.draggedOverCol;
      this.setState({ projects: updatedProjects });
      console.log(this.state.projects);
      this.updateIncidente(project.id, project["status"]);

      
      if (this.state.draggedOverCol === 4){

        var ticketsInvolucrados = this.state.tickets.slice(0).filter((entry) => {
          return entry.incidenteId.toString() === project.id.toString();
        });
        console.log("TICKETS INVOLUCRADOS");
        console.log(ticketsInvolucrados);
        ticketsInvolucrados.forEach(ticket => {
          this.enviarWhatsappConfirmacion(ticket.solicitante,ticket.id);
        });
      }
 
    }

    if(this.state.draggedOverCol === 4 || this.state.draggedOverCol === 5){
      
        jsonObject = {
          "status": this.state.draggedOverCol,
          "closeDate": moment().format('YYYY-MM-DD'),
          "closeTime": moment().format('HH:mm:ss')
        };
      
      console.log(jsonObject);
      data = JSON.stringify(jsonObject);
      config = {
        method: 'patch',
        url: '/api/incidentes/'+project.id.toString(),
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

    var ticketsInvolucrados = this.state.tickets.slice(0).filter((entry) => {
      return entry.incidenteId.toString() === project.id.toString();
    });
    
    ticketsInvolucrados.forEach(ticket => {
      
    
        jsonObject = {
          "status": this.state.draggedOverCol,
          "closeDate": moment().format('YYYY-MM-DD'),
          "closeTime": moment().format('HH:mm:ss')
        };
      console.log(jsonObject);
      data = JSON.stringify(jsonObject);
      
      config = {
        method: 'patch',
        url: '/api/tickets/'+ticket.id.toString(),
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
    });


  }

  updateAsignado(id, asignado){
    const updatedProjects = this.state.projects.slice(0);
    updatedProjects.find((projectObject) => {
      return projectObject.id === id;
    }).asignado = asignado;
    updateProjects.find((projectObject) => {
      return projectObject.id === id;
    }).status = this.state.draggedOverCol;
    this.setState({ projects: updatedProjects });
    console.log(this.state.draggedOverCol);
    //Actualizando el ticket en la base de datos
    this.updateIncidente(id, this.state.draggedOverCol);
    this.updateAsignacion(id, asignado);
  }

  render() {
    if (this.state.isLoading) {
      return <div><div className={"loading"}>Loading&#8230;</div></div>
    }

    return (
        <div >
          {(this.state.popupActive)
					? <div style={{'position': 'relative','background': 'rgba(0, 0, 0, 1)'}}>
            <div style={{'position': 'absolute',  'top': '50%',  'left': '50%', 'margin':'-25px 0 0 -25px' , 'zIndex': '101'}}>
            <form onSubmit={this.handleSubmit}>
              <label>
                <p>Asignar incidente {this.state.incidenteActivo}:</p>
                <input type="text" value={this.state.value} onChange={this.updateAsignado} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            </div>
          </div>
          : <div>
				{this.columns.map((column) => {                          //<---------MAPING COLUMNS
					return (
						<KanbanColumn
							name={ column.name }
							stage={ column.stage }
              color={ column.color }
							projects={ this.state.projects.filter((project) => {return parseInt(project.status, 10) === column.stage;}) }
							onDragEnter={ this.handleOnDragEnter }        //DRAG ENTER
							onDragEnd={ this.handleOnDragEnd }            //DRAG END
							key={ column.stage }
						/>
					);
				})}
      </div>
      }

        </div>
    );
  }
}

/*
 * The Kanban Board Column React component COLUMN
 */
class KanbanColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mouseIsHovering: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({mouseIsHovering: false});
  }

  generateKanbanCards() {
    return this.props.projects.slice(0).map((project) => {       //<-----MAPING PROJECTS
      return ( 
        <KanbanCard
					project={project}
					key={project.description}
					onDragEnd={this.props.onDragEnd}                       //drag END 
				/>
      );
    });
  }

  render() {
    /*
            const columnStyle = {
              display: "inline-block",
              verticalAlign: "top",
              marginRight: "5px",
              marginBottom: "5px",
              paddingLeft: "5px",
              paddingTop: "0px",
              width: "230px",
              textAlign: "center",
              "borderRadius": "8px",
              backgroundColor: this.state.mouseIsHovering ? "#d3d3d3" : "#ccccff" };
              */
    
    /*
               style={
          'display': 'inline-block',
          'verticalAlign': 'top',
          'marginRight': '5px',
          'marginBottom': '5px',
          'paddingLeft': '5px',
          'paddingTop': '0px',
          'width': '230px',
          'textAlign': 'center",
          "borderRadius": '8px',
          "borderStyle": 'solid',
          "borderWidth": 'medium',
          'backgroundColor': this.state.mouseIsHovering
            ? "#d3d3d3"
            : this.props.color
        }
    */
    
    /*
    const columnStyle = {
			'display': 'inline-block',
			'verticalAlign': 'top',
			'marginRight': '5px',
			'marginBottom': '5px',
			'paddingLeft': '5px',
			'paddingTop': '0px',
			'width': '230px',
			'textAlign': 'center',
			'backgroundColor': (this.state.mouseIsHovering) ? '#d3d3d3' : '#f0eeee',
		};
    */
    
    return (
       <div
       style={{
			'display': 'inline-block',
			'verticalAlign': 'top',
			'marginRight': '5px',
			'marginBottom': '5px',
			'paddingLeft': '5px',
			'paddingTop': '0px',
      'fontFamily': 'Karla',
      'height': '100%',
      'minHeight': '35em',
			'width': '15em',
			'textAlign': 'center',
			'backgroundColor': (this.state.mouseIsHovering) ? '#d3d3d3' : this.props.color,
      "borderRadius": '8px',
      "borderStyle": 'solid',
      "borderWidth": 'medium',
		}}
				
				onDragEnter={(e) => { this.setState({ mouseIsHovering: true }); this.props.onDragEnter(e, this.props.stage);}}                            //drag ENTER
				onDragExit={(e) => { this.setState({ mouseIsHovering: false });}}  //drag EXIT
			>
				<h4>{this.props.name} </h4>
				{this.generateKanbanCards()}
				<br/>
      </div>
    );   //	<h4>{this.props.stage}. {this.props.name} ({this.props.projects.length})</h4>
  } //render
}

/*
 * The Kanban Board Card component  CARD
 */
class KanbanCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  
  handleChangeTitle(event) {
    //this.setState({value: event.target.value});
    //alert('An essay was submitted: ' + this.state.value);
    //alert('Title submitted ');
  }
  
  handleChangeDescription(event) {
    //this.setState({value: event.target.value});
    //alert('An essay was submitted: ' + this.state.value);
    //alert('Description submitted ');
  }
  
  render() {   //render card
    
    /*
    		const cardStyle = {
			'backgroundColor': '#f9f7f7',
			'paddingLeft': '0px',
			'paddingTop': '5px',
			'paddingBottom': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px',
		};*/
    
    function onClickView(e){
      e.target.style.cursor = 'pointer';
    }
 

		return (
			<div
				style={{
			'backgroundColor': this.props.project.color,
			'paddingLeft': '0px',
			'paddingTop': '5px',
			'paddingBottom': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px',
      "borderRadius": "8px",
      "borderStyle": "solid",
      "borderWidth": "thin",
      "boxShadow": "6px 6px 8px #777"
		}}
				draggable={true}
        
        onDragEnter={(e) => {e.target.style.cursor = 'move';  }}
        //Drag
        onMouseDown={(e) => {e.target.style.cursor = 'default';  }}
        onMouseMove={(e) => {e.target.style.cursor = 'move';  }}
        onMouseUp={(e) => {e.target.style.cursor = 'pointer';  }}
        
				onDragEnd={(e) => {this.props.onDragEnd(e, this.props.project);}} >
                    
				<div style={{'marginTop': '0px', 'marginBottom': '0px'}}>
          {(this.props.project.status===5) ? (
            <div id="idprojname" style={{'textDecoration':'line-through'}}>[
              <a href={"/incidente/"+this.props.project.id} target="_blank" rel="noopener noreferrer">
                <u>Incidente {this.props.project.id}</u>
              </a>] 
                {this.props.project.description}</div>
          ) : (
            <div id="idprojname">[
              <a href={"/incidente/"+this.props.project.id} target="_blank" rel="noopener noreferrer">
                <u>Incidente {this.props.project.id}</u>
              </a>] 
                {this.props.project.description}</div>
          )}
          <h2 style={{'marginTop': '0px', 'marginBottom': '0px'}}>{this.props.project.transDate}</h2>
          <h2 style={{'marginTop': '0px', 'marginBottom': '0px'}}>{this.props.project.transTime}</h2>
        </div>
				{(this.state.collapsed)
					? null
					: (<div>
                 {/* https://es.reactjs.org/docs/forms.html  -->*/}
              <form>
                   <p style={{'marginTop': '0px', 'marginBottom': '0px'}} maxLength= '150' onChange={this.handleChangeTitle} >
                     {"Solicitante: " + this.props.project.solicitante}
                   </p> 
                   <p style={{'marginTop': '0px', 'marginBottom': '0px'}} maxLength= '250' onChange={this.handleChangeDescription}>
                   {"Tipo: "+this.props.project.tipo }
                   </p>
               </form>  
             </div>
            )
				}
				<div
					style={{'width': '100%','color': '#7788FF'}}
					onClick={(e) => {this.setState({collapsed: !this.state.collapsed});}}
				>
				<u>	{(this.state.collapsed) ? String("Ver más") : String("Ocultar")} </u>
 
				</div>
			</div>
		);
    
    //style='rows: 3, cols: 50, maxlength: 150'
    /*
            const cardStyle = {
              backgroundColor: "#f9f7f7",
              paddingLeft: "0px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "0px",
              marginRight: "5px",
              marginBottom: "5px",
              "borderRadius": "8px",
              "box-shadow": "6px 6px 8px #777" };
                */
/*
    return React.createElement(
      "div",
      {
        style: {
          backgroundColor: this.props.project.color,
          paddingLeft: "0px",
          paddingTop: "5px",
          paddingBottom: "5px",
          marginLeft: "0px",
          marginRight: "5px",
          marginBottom: "5px",
          "borderRadius": "8px",
          "borderStyle": "solid",
          "borderWidth": "thin",
          "box-shadow": "6px 6px 8px #777"
        },

        draggable: true,
        onDragEnd: (e) => {
          this.props.onDragEnd(e, this.props.project);
        }
      },

      //React.createElement("div", null,
      //React.createElement("h4", null, this.props.project.name) , React.createElement("img", { src: "./edit_icon.svg"})       ),

      //React.createElement("div", null,
      //React.createElement("img", { src: "./edit_icon.svg"})   ),

      React.createElement(
        "div",
        null,
        React.createElement("h4", null, this.props.project.name)
      ),

      //this.props.project.description="hjhjhjh",

      this.state.collapsed
        ? null
        : React.createElement(
            "div",
            null,
            //React.createElement("strong", null, "*"),
            //this.props.project.description,
            React.createElement("img", { src: "./edit_icon.svg" }),
            //React.createElement("button", { src: "./edit_icon.svg"}),
            React.createElement(
              "textarea",
              { rows: "3", cols: "50", maxlength: "150" },
              this.props.project.name
            ),

            React.createElement(
              "textarea",
              {
                rows: "5",
                cols: "50",
                maxlength: "250",
                value: this.state.text,
                onChange: this._textChange
              },

              this.props.project.description
            ),

            React.createElement("br", null)
          ),

      React.createElement(
        "div",
        {
          style: { width: "100%" },
          onClick: (e) => {
            this.setState({ collapsed: !this.state.collapsed });
          }
        },

        this.state.collapsed
          ? String.fromCharCode("9660")
          : String.fromCharCode("9650")
      )
    );
    */
    

    
  } //render card
}
