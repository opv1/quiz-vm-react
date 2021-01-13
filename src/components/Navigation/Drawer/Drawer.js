import React, { Component } from 'react'
import classes from './Drawer.module.scss'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [{ to: '/quizs/', label: 'Список', exact: true }]

    console.log('Auth', this.props.isAuthenticated)

    if (this.props.isAuthenticated) {
      links.push({
        to: '/quizs/quiz-creator',
        label: 'Создать тест',
        exact: false,
      })
      links.push({ to: '/quizs/logout', label: 'Выйти', exact: false })
    } else {
      links.push({ to: '/quizs/auth', label: 'Авторизация', exact: false })
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
}

export default Drawer
