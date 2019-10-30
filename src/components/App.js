import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';
import NotFound from '../components/General/NotFound'
import { Container } from 'reactstrap';
const Prueba = () => <div>hola</div>

const App = (props) => (
	<BrowserRouter>
		<Menu />
		<Container>
			<Switch>
				<Route exact path='/usuarios' component={Usuarios} />
				<Route exact path='/tareas' component={Prueba} />
				<Route component={NotFound} />
			</Switch>
		</Container>
	</BrowserRouter>
);

export default App;