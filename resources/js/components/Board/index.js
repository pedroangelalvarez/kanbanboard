import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import detalles from './index.css';

let colorCard = "#f9fdf7";

let columnList =[
  { name: "POR HACER", stage: 1, color: "#e8e858" },
  { name: "EN PROGRESO", stage: 2, color: "#b8bcf8" },
  { name: "TERMINADO", stage: 3, color: "#88ff88" },
  { name: "CANCELADO", stage: 4, color: "#ee0a0a" }
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
      draggedOverCol: 0
    };

    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.columns = columnList;                                       //<---------column list
  }

  componentDidMount() {
    this.setState({ projects: projectList, isLoading: false });
  }

  //this is called when a Kanban card is dragged over a column (called by column)
  handleOnDragEnter(e, stageValue) {
    this.setState({ draggedOverCol: stageValue });
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
      return <h3>"Loading..."</h3>
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
              "border-radius": "8px",
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
          "border-radius": '8px',
          "border-style": 'solid',
          "border-width": 'medium',
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
			'width': '230px',
			'textAlign': 'center',
			'backgroundColor': (this.state.mouseIsHovering) ? '#d3d3d3' : this.props.color,
      "border-radius": '8px',
      "border-style": 'solid',
      "border-width": 'medium',
		}}
				
				onDragEnter={(e) => {this.setState({ mouseIsHovering: true }); this.props.onDragEnter(e, this.props.stage);}}                            //drag ENTER
				onDragExit={(e) => {this.setState({ mouseIsHovering: false });}}  //drag EXIT
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
  
  fnSave(event) {
    //this.setState({value: event.target.value});
    //alert('An essay was submitted: ' + this.state.value);
    alert('Saved!');
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
      "border-radius": "8px",
      "border-style": "solid",
      "border-width": "thin",
      "box-shadow": "6px 6px 8px #777"
		}}
				draggable={true}
        
				onDragEnd={(e) => {this.props.onDragEnd(e, this.props.project);}}     //drag END
			>
				<div><h id="idprojname">[{this.props.project.id}] {this.props.project.name}</h><h2> {this.props.project.date}</h2></div>
				{(this.state.collapsed)
					? null
					: (<div>
                 {/* https://es.reactjs.org/docs/forms.html  -->*/}
              <form>
                   
                   <strong>Title: </strong>
                   <textarea maxlength= '150' onChange={this.handleChangeTitle} >
                     {this.props.project.name}
                   </textarea> 
                   <strong>
                     : </strong>
                   <textarea maxlength= '250' onChange={this.handleChangeDescription}>
                   { this.props.project.description }
                   </textarea>
                  
                {/*<button onclick={fnSave()}>Save</button>*/}
                             <button
                              type="button"
                              onClick={function() {
                                {/*setCount(count + 1);*/}
                               //alert(("dos").concat(" <--- name"));
                                                                           
                           
                    
                                      ReactDOM.render(
                                        <h3>Good!!!!</h3>,
                                        document.getElementById("idprojname")
                                      );
                                {/*alert('2.Saved!');*/}
                                {/*this.getElementById("namex")="hhh";*/}
                                {/*$('namex').text="hola";*/}
                              }}
                            >
                              Save
                            </button>
                   <br/>
               </form>  
             </div>
            )
				}
				<div
					style={{'width': '100%'}}
					onClick={(e) => {this.setState({collapsed: !this.state.collapsed});}}
				>
					{(this.state.collapsed) ? String.fromCharCode('9660') : String.fromCharCode('9650')}
 
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
              "border-radius": "8px",
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
          "border-radius": "8px",
          "border-style": "solid",
          "border-width": "thin",
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
