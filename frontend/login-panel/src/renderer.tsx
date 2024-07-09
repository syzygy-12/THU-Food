import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Main } from 'Pages/Main'
import { HomePage } from 'Pages/HomePage'
import { ExplorePage } from 'Pages/ExplorePage'
import { InfoPage } from 'Pages/InfoPage'
import { UserEntrance } from 'Pages/UserEntrancePage'
import { UserRegister } from 'Pages/UserRegisterPage'
import { UserLogin } from 'Pages/UserLoginPage'
import { TestPage } from 'Pages/TestPage'

const Layout = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/user-entrance" exact component={UserEntrance} />
                <Route path="/user-register" exact component={UserRegister} />
                <Route path="/user-login" exact component={UserLogin} />
                <Route path="/home" exact component={HomePage} />
                <Route path="/explore/:id" exact component={ExplorePage} />
                <Route path="/info/:id" exact component={InfoPage} />
                <Route path="/image/:id" exact component={Image} />
                <Route path="/test" exact component={TestPage} />
            </Switch>
        </HashRouter>
    )
}
render(<Layout />, document.getElementById('root'))
