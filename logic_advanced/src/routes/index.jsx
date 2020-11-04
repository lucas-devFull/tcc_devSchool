import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

const Login = lazy(() => import('../modules/login/login'));
const RegisterStudant = lazy(() => import('../modules/register/student/student'));
const Dashboard = lazy(() => import('../modules/dashboard/dashboard'));
const RegisterTeacher = lazy(() => import('../modules/register/teacher/teacher'));
const ClassTeacher = lazy(() => import('../modules/classTeacher'));
const RegisterModulos = lazy(() => import('../modules/modulos/modulos'));
const RegisterMaterias = lazy(() => import('../modules/register/materias/materias'));

const App = () =>
	<Router>
		<Suspense fallback={null}>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/register/student" component={RegisterStudant} />
				<Route path="/conversations" component={ClassTeacher} />
				<Route path="/teacher" component={RegisterTeacher} />
				<Route path="/modulos" component={RegisterModulos} />
				<Route path="/materias" component={RegisterMaterias} />
				<Redirect path="*" to="/" />
			</Switch>
		</Suspense>
	</Router>

export default App;