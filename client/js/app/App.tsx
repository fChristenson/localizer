import * as React from "react";

export default class App extends React.Component {
    async componentDidMount() {
        const res = await fetch("/api/v1/translations", { headers: { "Content-type": "application/json" } });
        const text = await res.text();
        alert(text);
    }

    render() {
        return <h1>hello world</h1>;
    }
}
