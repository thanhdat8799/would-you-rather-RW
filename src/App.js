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
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

function App({auth}) {
  const history = useHistory();
  console.log(history)
  const location = history.location.pathname;
  
  useEffect(() => {
    console.log(location)
    if(auth === null) {
      return history.push('/login') 
    }
  })
  

  return (
    <div className="App">
      <Header/>
      
      {
        auth ?
          (<Switch>
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
            <Route exact path="/leaderboard" component={LeaderBoard} />
            <Route exact path="/login" >
              <LoginPage previousPage={location} />
            </Route>
            <Route exact path="/add" component={NewQuestion} />
            <Route component={PageNotFound} />
          </Switch>)
          : <LoginPage previousPage={location} />

      }
    </div>
  );
}

const mapStateToProps = ({auth}) => {
  return {
      auth
  };
};

export default  connect(mapStateToProps, { setCurrentUser })(App);
