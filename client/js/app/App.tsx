import * as React from "react";
import { Header } from "../components/header/Header";
import { KeyEditor } from "../components/keyEditor/KeyEditor";
import { ProjectBar } from "../components/projectBar/ProjectBar";
import { TranslationList } from "../components/translationList/TranslationList";
import { TranslationsBar } from "../components/translationsBar/TranslationsBar";
import { getAllTranslations } from "../lib/api/translationApi";
import { IContextProps, withAppContext } from "./AppContext";

class AppComponent extends React.Component<IContextProps> {
    public async componentDidMount() {
        const translations = await getAllTranslations();
        this.props.context.setTranslations(translations);
    }

    public render() {
        return (
            <div className="app">
                <Header username="default" />
                <ProjectBar projectName="Bookstore" />
                <TranslationsBar numberOfKeys={this.props.context.translations.length} />
                <TranslationList />
                <KeyEditor />
            </div>
        );
    }
}

export const App = withAppContext(AppComponent);
