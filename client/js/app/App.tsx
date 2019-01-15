import * as React from "react";
import { Header } from "../components/header/Header";
import { ProjectBar } from "../components/projectBar/ProjectBar";
import { TranslationsBar } from "../components/translationsBar/TranslationsBar";

export function App() {
    return (
        <div className="app">
            <Header username="default" />
            <ProjectBar projectName="Bookstore" />
            <TranslationsBar />
        </div>
    );
}
