import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import axios from 'axios';
import Swal from 'sweetalert2'

//Componente que recibe el id del incidente y lo muestra en pantalla
export default class Incidente extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        id: 0,
        data: [],
        draggedOverCol: 0
      };

    }

    componentDidMount() {
      var server_request_uri = location.pathname + location.search;
      var incidenteid = server_request_uri.substring(8,server_request_uri.length);
      console.log(incidenteid);
      this.setState({ id: incidenteid })
      fetch('/getincidente/'+incidenteid, {
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

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    render() {
        if (this.state.isLoading) {
          return <h3>"Loading..."</h3>
        }

        let modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            background: '#fff',
            border: '1px solid gray',
            boxShadow: '4px 4px 25px 1px #888888',
            borderRadius: '2px'
          }
          
          let modalHeaderStyle = {
            width: '100%',
            height: 40,
            background: '#333333',
            position: 'absolute',
            borderBottom: '1px solid black',
            top: 0,
            cursor: 'move',
            color: 'white'
          }
          
          let modalFooterStyle = {
            width: '100%',
            height: 40,
            borderTop: '1px solid black',
            background: '#333',
            position: 'absolute',
            bottom: 0,
            textAlign: 'right'
          }
          
          let modalBodyStyle = {
            paddingTop: 43,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 20,
            background: '#242424',
            height: '80%',
            color: 'white'
          }
          
          let closeButtonStyle = {
              color: '#777',
              font: '14px/100% arial, sans-serif',
              position: 'absolute',
              right: '5px',
              textDecoration: 'none',
              textShadow: '0 1px 0 #fff',
              top: 5
          }
    
          if (this.props.width && this.props.height) {
            modalStyle.width = this.props.width + 'px'
            modalStyle.height = this.props.height + 'px'
            modalStyle.marginLeft = '-' + (this.props.width/2) + 'px',
            modalStyle.marginTop = '-' + (this.props.height/2) + 'px',
            modalStyle.transform = null
          }
    
          if (this.props.style) {
            for (let key in this.props.style) {
              modalStyle[key] = this.props.style[key]
            }
          }
    
          let backdropStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.3)'
          }
    
          if (this.props.backdropStyle) {
            for (let key in this.props.backdropStyle) {
              backdropStyle[key] = this.props.backdropStyle[key]
            }
        }
    
        return (
            <div>
                <div >
                            <div className={this.props.containerClassName}>
                            <div className={this.props.className} style={modalStyle}>
                            <div className={"modalHeader"} style={modalHeaderStyle}>
                                <a onClick={e => this.close(e)} href="#" className={"close-thin"}></a>
                            </div>
                            <div className={"modalBody"} style={modalBodyStyle}>
                            {this.props.children}
                            </div>
                            <div className={"modalFooter"} style={modalFooterStyle}>
                                <a onClick={(e) => {this.close(e); window.location.reload(false);}} className='mm-close'>Close</a>
                            </div>
                            </div>
                            {!this.props.noBackdrop &&
                                <div className={this.props.backdropClassName} style={backdropStyle}
                                    onClick={e => this.close(e)}/>}
                        </div>
                </div>
            </div>
        );
      }
}