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
import {CommentPage} from 'Pages/CommentPage'
import { UserPage } from 'Pages/UserPage'
import { SettingPage } from 'Pages/SettingPage'
import { AdminPage } from 'Pages/AdminPage';
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
                <Route path="/test" exact component={TestPage} />
                <Route path="/main" exact component={Main} />
                <Route path="/userpage/:id" exact component={UserPage} />
                <Route path="/comment/:id" exact component={CommentPage} />
                <Route path="/settings" exact component={SettingPage} />
                <Route path="/admin/:id" exact component={AdminPage} />
            </Switch>
        </HashRouter>
    )
}
render(<Layout />, document.getElementById('root'))
