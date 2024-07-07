import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Main } from 'Pages/Main'
import {StudentRegister} from 'Pages/Student-Register'
import {StudentLogin} from 'Pages/Student-Login'
import {Students} from 'Pages/students'
import {Canteen} from 'Pages/canteen-worker'
import {CanteenLogin} from 'Pages/Canteen-Login'
import {CanteenRegister} from 'Pages/Canteen-Register'
import {HomePage} from 'Pages/HomePage'
import {ExplorePage} from 'Pages/ExplorePage'
import {InfoPage} from 'Pages/InfoPage'

const Layout = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/studentregister" exact component={StudentRegister} />
                <Route path="/studentlogin" exact component={StudentLogin} />
                <Route path="/canteen-worker" exact component={Canteen} />
                <Route path="/student" exact component={Students} />
                <Route path="/canteenregister" exact component={CanteenRegister} />
                <Route path="/canteenlogin" exact component={CanteenLogin} />
                <Route path="/home" exact component={HomePage} />
                <Route path="/explore/:id" exact component={ExplorePage} />
                <Route path="/info/:id" exact component={InfoPage} />
            </Switch>
        </HashRouter>
    )
}
render(<Layout />, document.getElementById('root'))
