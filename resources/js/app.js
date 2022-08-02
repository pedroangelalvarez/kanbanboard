//import './bootstrap';

var server_request_uri = location.pathname + location.search;
console.log(server_request_uri);
if (server_request_uri === '/'){
    require('./components/Index');
} else if (server_request_uri.includes('ticket')){
    require('./components/IndexTicket');
} else if (server_request_uri.includes('incidente')){
    require('./components/IndexIncidente');
}