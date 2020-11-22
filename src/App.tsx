import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {TestPage} from "@/pages/testPage";
import {ChanelsWindow} from "@/modules/ChanelWindow/chanelsWindow";

export const App: React.FC<{}> = () => (
    <Provider store={store}>
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Начало</Link>
                    </li>
                    <li>
                        <Link to="/chanelsWindow">SAGA Chanels</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/chanelsWindow">
                    <TestPage />
                </Route>

                <Route path="*">
                    <div>
                        <h1>Нажмите на меню чтобы запустить процесс</h1>
                    </div>
                </Route>
            </Switch>
        </Router>
    </Provider>
);
