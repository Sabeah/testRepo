import React from "react";
import { Provider } from "react-redux";
import Editor from "./components";
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <Editor />
        </Provider>
    );
}

export default App;
