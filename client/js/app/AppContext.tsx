import * as React from "react";
import { Translation } from "../lib/models/Translation";

export interface IAppContext {
  onCloseKeyEditor: () => void;
  onOpenKeyEditor: () => void;
  setTranslations: (translations: Translation[]) => void;
  showKeyEditor: boolean;
  translations: Translation[];
}

const context = React.createContext({});

export interface IContextProps {
  context: IAppContext;
}

interface IAppState {
  showKeyEditor: boolean;
  translations: Translation[];
}

interface IAppContextProviderProps {
  children: React.ReactNode;
}

export class AppContextProvider extends React.Component<IAppContextProviderProps, IAppState> {
  constructor(props: IAppContextProviderProps) {
    super(props);
    this.state = { showKeyEditor: false, translations: [] };
    this.onCloseKeyEditor = this.onCloseKeyEditor.bind(this);
    this.onOpenKeyEditor = this.onOpenKeyEditor.bind(this);
    this.setTranslations = this.setTranslations.bind(this);
  }

  public render() {
    const contextValue = {
      onCloseKeyEditor: this.onCloseKeyEditor,
      onOpenKeyEditor: this.onOpenKeyEditor,
      setTranslations: this.setTranslations,
      showKeyEditor: this.state.showKeyEditor,
      translations: this.state.translations,
    };
    return (
      <context.Provider value={contextValue}>
        {this.props.children}
      </context.Provider>
    );
  }

  private onOpenKeyEditor() {
    this.setState({ showKeyEditor: true });
  }

  private onCloseKeyEditor() {
    this.setState({ showKeyEditor: false });
  }

  private setTranslations(translations: Translation[]) {
    this.setState({ translations });
  }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<P extends IContextProps>(Component: React.ComponentClass<P>) {
  return (props: Omit<P, "context">) => {
    return <context.Consumer>
      {(value) => {
        // @ts-ignore
        return <Component {...props} context={value} />;
      }}
    </context.Consumer>;
  };
}
