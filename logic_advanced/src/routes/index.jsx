import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

const Login = lazy(() => import('../modules/login/login'));
const RegisterStudant = lazy(() => import('../modules/register/student/student'));
const Dashboard = lazy(() => import('../modules/dashboard/dashboard'));
const RegisterTeacher = lazy(() => import('../modules/register/teacher/teacher'));
const ClassTeacher = lazy(() => import('../modules/classTeacher'));

const App = () =>
	<Router>
		<Suspense fallback={null}>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/register/student" component={RegisterStudant} />
<<<<<<< HEAD
				<Route path="/manage/teacher" component={RegisterTeacher} />
=======
				<Route path="/register/teacher" component={RegisterTeacher} />
>>>>>>> a3e2c55aaafbf94a99fbbf15ec36db8369d1f2ee
				<Route path="/class/conversations" component={ClassTeacher} />
				<Redirect path="*" to="/" />
			</Switch>
		</Suspense>
	</Router>

export default App;