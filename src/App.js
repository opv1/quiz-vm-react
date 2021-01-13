import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth'

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/quizs/auth' component={Auth} />
        <Route path='/quizs/quiz/:id' component={Quiz} />
        <Route path='/quizs/' exact component={QuizList} />
        <Redirect to='/quizs/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quizs/quiz-creator' component={QuizCreator} />
          <Route path='/quizs/quiz/:id' component={Quiz} />
          <Route path='/quizs/logout' component={Logout} />
          <Route path='/quizs/' exact component={QuizList} />
          <Redirect to='/quizs/' />
        </Switch>
      )
    }

    return <Layout>{routes}</Layout>
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
