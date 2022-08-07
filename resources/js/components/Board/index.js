import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "@lourenci/react-kanban/dist/styles.css";
import detalles from './index.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import "@fontsource/karla";

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
    order:1,
    name: "Project 1",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 1,
    color: colorCard
  },

  { 
    id:2,
    order:1,
    name: "Project 2",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 1,
    color: colorCard
  },

  { 
    id:3,
    order:1,
    name: "Project 3",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 1,
    color: colorCard
  },

  { 
    id:4,
    order:1,
    name: "Project 4",
    date:'2022-04-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 2,
    color: colorCard
  },

  { 
    id:5,
    order:1,
    name: "Project 5",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 3,
    color: colorCard
  },

  { 
    id:6,
    order:1,
    name: "Project 6",
    date:'2022-03-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 3,
    color: colorCard
  },

  { 
    id:7,
    order:1,
    name: "Project 7",
    date:'2022-04-01',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 4,
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
      draggedOverCol: 0
    };

    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.columns = columnList;                                       //<---------column list
  }

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

  ingresarPizarra(){
    //Inicializo json
    var registros = [];
    //iterar data
    for(let i = 0; i < this.state.data.length; i++) {
        let obj = this.state.data[i];
        var item = {}
        item ["id"] = obj.id;
        item ["order"] = "1";
        item ["name"] = obj.description; //"Ticket "+(obj.id).toString() 
        item ["date"] = obj.transDate;
        item ["description"] = obj.tipo;
        item ["project_stage"] = obj.id;
        item ["color"] = colorCard;
        console.log(item);
        registros.push(item);
    }
    this.setState({ projects: registros, isLoading: false });
  }


  componentDidMount() {

     // Retrieve project data from the database.
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
        this.setState({ data: result['data']})
        console.log(result['data']);
        this.ingresarPizarra();
    })
    .catch((error) => {
        console.log('Error: ', error);
    });

    console.log(this.state.data);

    //this.setState({ projects: projectList, isLoading: false });
  }

  //this is called when a Kanban card is dragged over a column (called by column)
  handleOnDragEnter(e, stageValue) {
    this.setState({ draggedOverCol: stageValue });
    console.log(this.setState.data);
  }

  //this is called when a Kanban card dropped over a column (called by card)
  handleOnDragEnd(e, project) {
    const updatedProjects = this.state.projects.slice(0);
    updatedProjects.find((projectObject) => {
      return projectObject.name === project.name;
    }).project_stage = this.state.draggedOverCol;
    this.setState({ projects: updatedProjects });
  }

  render() {
    if (this.state.isLoading) {
      return <div><div className={"loading"}>Loading&#8230;</div></div>
    }

    return (
        <div>
      <div >
				{this.columns.map((column) => {                          //<---------MAPING COLUMNS
					return (
						<KanbanColumn
							name={ column.name }
							stage={ column.stage }
              color={ column.color }
							projects={ this.state.projects.filter((project) => {return parseInt(project.project_stage, 10) === column.stage;}) }
							onDragEnter={ this.handleOnDragEnter }        //DRAG ENTER
							onDragEnd={ this.handleOnDragEnd }            //DRAG END
							key={ column.stage }
						/>
					);
				})}
      </div>
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
    this.state = { mouseIsHovering: false };
  }

  generateKanbanCards() {
    return this.props.projects.slice(0).map((project) => {       //<-----MAPING PROJECTS
      return ( 
        <KanbanCard
					project={project}
					key={project.name}
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
      'height': '35em',
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
  
  fnSave(value) {
    //this.setState({value: event.target.value});
    //alert('An essay was submitted: ' + this.state.value);
    alert('Saved!'+value.toString());
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
      "box-shadow": "6px 6px 8px #777"
		}}
				draggable={true}
        
        onDragEnter={(e) => {e.target.style.cursor = 'move';  }}
        //Drag
        onMouseDown={(e) => {e.target.style.cursor = 'default';  }}
        onMouseMove={(e) => {e.target.style.cursor = 'move';  }}
        onMouseUp={(e) => {e.target.style.cursor = 'pointer';  }}
        
				onDragEnd={(e) => {this.props.onDragEnd(e, this.props.project);}} >
                    
				<div><h id="idprojname">[<a href={"/ticket/"+this.props.project.id} target="_blank" rel="noopener noreferrer"><u>Ticket {this.props.project.id}</u></a>] {this.props.project.name}</h><h2> {this.props.project.date}</h2></div>
				{(this.state.collapsed)
					? null
					: (<div>
                 {/* https://es.reactjs.org/docs/forms.html  -->*/}
              <form>
                   
                   <strong>Title: </strong>
                   <p maxlength= '150' onChange={this.handleChangeTitle} >
                     {this.props.project.name}
                   </p> 
                   <strong>
                     : </strong>
                   <p maxlength= '250' onChange={this.handleChangeDescription}>
                   { this.props.project.description }
                   </p>
                  
                   <br/>
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
