import logo from './logo.svg';
import './App.css';
import LoginPage from './components/login-page.component'
import Header from './components/header.component'
import Questions from './components/questions.component'
import QuestionDetail from './components/question-detail.component'
import NewQuestion from './components/new-question.component'
import PageNotFound from './components/page-not-found.component'
import LeaderBoard from './components/leader-board.component'
import { setCurrentUser } from "./actions/auth";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import {useEffect} from 'react'

function App({auth, setCurrentUser}) {
  const history = useHistory();
  console.log('current user:'+ auth)

  if(auth === null) 
   (history.push('/login'))

  return (
    <div className="App">
        <Header/>
        
        <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Questions} />
        <Route exact path="/questions" component={Questions} />
        <Route
          exact
          path="/questions/:id"
          component={QuestionDetail}
          
        />
        <Route exact path="/add" component={Header} />
        <Route exact path="/leader-board" component={LeaderBoard} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/new-question" component={NewQuestion} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({auth}) => {
  return {
      auth
  };
};

export default  connect(mapStateToProps, { setCurrentUser })(App);
