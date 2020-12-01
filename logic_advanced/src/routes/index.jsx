import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

const Login = lazy(() => import('../modules/login/login'));
const RegisterStudant = lazy(() => import('../modules/register/student/student'));
const Dashboard = lazy(() => import('../modules/dashboard/dashboard'));
const RegisterTeacher = lazy(() => import('../modules/register/teacher/teacher'));
const Lessons = lazy(() => import('../modules/lessons'));
const RegisterModulos = lazy(() => import('../modules/modulos/modulos'));
const RegisterMaterias = lazy(() => import('../modules/register/materias/materias'));
const RegisterAlunos = lazy(() => import('../modules/register/alunos/alunos'));
const RegisterClasse = lazy(() => import('../modules/register/classe/classe'));
const Grafico = lazy(() => import('../modules/graficos/graficos'));

const App = () =>
	<Router>
		<Suspense fallback={null}>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/register/student" component={RegisterStudant} />
				<Route path="/lessons" component={Lessons} />
				<Route path="/teacher" component={RegisterTeacher} />
				<Route path="/modulos" component={RegisterModulos} />
				<Route path="/materias" component={RegisterMaterias} />
				<Route path="/alunos" component={RegisterAlunos} />
				<Route path="/classe" component={RegisterClasse} />
				<Route path="/grafico" component={Grafico} />
				<Redirect path="*" to="/" />
			</Switch>
		</Suspense>
	</Router>

export default App;