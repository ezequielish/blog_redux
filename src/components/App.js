import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';
import NotFound from '../components/General/NotFound'
import Publicaciones from '../components/Publicaciones/index'
import Tareas from '../components/Tareas/index'
import Guardar from '../components/Tareas/Guardar'
import { Container } from 'reactstrap';


const App = (props) => (
	<BrowserRouter>
		<Menu />
		<Container>
			<Switch>
				<Route exact path='/usuarios' component={Usuarios} />
				<Route exact path='/publicaciones/:id' component={Publicaciones} />
				<Route exact path='/tareas' component={Tareas} />
				<Route exact path='/tareas/guardar' component={Guardar} />
				<Route exact path='/tareas/guardar/:user_id/:tarea_id' component={Guardar} />
				<Route component={NotFound} />
			</Switch>
		</Container>
	</BrowserRouter>
);

export default App;