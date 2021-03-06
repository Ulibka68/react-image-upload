import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {TestPage} from "@/pages/testPage";
import {ChanelsWindow} from "@/modules/ChanelWindow/chanelsWindow";
import {PagesUploadImageCanvas} from "@pages/uploadImageCanvas";
import {ImageUploadUrl} from "@components/imageUploadUrl";
import {ImageUploadUrlNoCanvas} from "@components/imageUploadUrlImgOnly";
import {Logger} from "@components/logview";

Logger.debug("comment", "Cache", "a");

export const App: React.FC<{}> = () => (
    <Provider store={store}>
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Начало</Link>
                    </li>
                    <li>
                        <Link to="/uploadImage">Upload</Link>
                    </li>
                    <li>
                        <Link to="/uploadImageUrl">Upload image URL</Link>
                    </li>
                    <li>
                        <Link to="/uploadImageUrlNoCanvas">Upload image NO canvas</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/chanelsWindow">
                    <TestPage />
                </Route>
                <Route path="/uploadImage">
                    <PagesUploadImageCanvas />
                </Route>
                <Route path="/uploadImageUrl">
                    <ImageUploadUrl />
                </Route>
                <Route path="/uploadImageUrlNoCanvas">
                    <ImageUploadUrlNoCanvas />
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
