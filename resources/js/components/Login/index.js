import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import './index.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
        }
    }

    login() {  
        const { username, password } = this.state;
        if (username.length>0 && password === "admin") {
            window.location.href="/";
        } else {
            this.setState({ error: "Invalid username or password" });
        }
    }
    
    render() {

        function Login2() {
            const { username, password } = this.state;
            if (username.length>0 && password === "admin") {
                window.location.href="/";
            } else {
                this.setState({ error: "Invalid username or password" });
            }
            /*
            //Consulto en el api
            axios.post('http://localhost:8000/api/login', {
                username: username,
                password: password
            })
            .then(response => {
                console.log(response);
                if (response.data.status === 200) {
                    //Guardo el token en el local storage
                    localStorage.setItem('tokenKanban', response.data.token);
                    //Redirecciono a la pagina principal
                    this.props.history.push('/home');
                } else {
                    this.setState({ error: response.data.message });
                }
            })
            .catch(error => {
                console.log(error);
            });
            */
        }
        return ( 
        <div className="container">
            <div className="row" style={{'display': 'flex', 'flexDirection': 'row', 'flexWrap': 'wrap', 'padding': '3em', 'justifyContent': 'space-around'}}>
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Inicie sesión</h3>
                </div>
                <div className="panel-body">
                        <div className="form-group">
                        <input className="form-control" onChange={e => this.setState({username: e.target.value})} placeholder="Documento" name="username" type="text" />
                        </div>
                        <br/>
                        <div className="form-group">
                        <input className="form-control" onChange={e => this.setState({password: e.target.value})} placeholder="Contraseña" name="password" type="password" />
                        </div>
                        <br/>
                        <input type="button" className="btn btn-lg btn-success btn-block" onClick={(e)=> {this.login()}} value="Login" />
                </div>
                </div>
            </div> 











            </div>
        </div>
        );
    }
}
