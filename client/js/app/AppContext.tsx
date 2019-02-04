import * as React from "react";
import { Translation, TranslationId, TranslationTag } from "../lib/models/Translation";

export interface IAppContext {
  onCloseKeyEditor: () => void;
  onOpenKeyEditor: () => void;
  onEditTranslation: (translationId: TranslationId) => void;
  setTranslations: (translations: Translation[]) => void;
  setSelectedTag: (tag: TranslationTag) => void;
  onSearch: (value: string) => void;
  translationToEdit?: Translation;
  showKeyEditor: boolean;
  translations: Translation[];
  selectedTag: TranslationTag;
  filter: string;
}

const context = React.createContext({});

export interface IContextProps {
  context: IAppContext;
}

interface IAppState {
  showKeyEditor: boolean;
  translations: Translation[];
  selectedTag: TranslationTag;
  filter: string;
  translationToEdit?: Translation;
}

interface IAppContextProviderProps {
  children: React.ReactNode;
}

export class AppContextProvider extends React.Component<IAppContextProviderProps, IAppState> {
  constructor(props: IAppContextProviderProps) {
    super(props);
    this.state = { showKeyEditor: false, translations: [], selectedTag: "", filter: "" };
    this.onSearch = this.onSearch.bind(this);
    this.onEditTranslation = this.onEditTranslation.bind(this);
    this.onCloseKeyEditor = this.onCloseKeyEditor.bind(this);
    this.onOpenKeyEditor = this.onOpenKeyEditor.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.setTranslations = this.setTranslations.bind(this);
  }

  public render() {
    const contextValue: IAppContext = {
      filter: this.state.filter,
      onCloseKeyEditor: this.onCloseKeyEditor,
      onEditTranslation: this.onEditTranslation,
      onOpenKeyEditor: this.onOpenKeyEditor,
      onSearch: this.onSearch,
      selectedTag: this.state.selectedTag,
      setSelectedTag: this.setSelectedTag,
      setTranslations: this.setTranslations,
      showKeyEditor: this.state.showKeyEditor,
      translationToEdit: this.state.translationToEdit,
      translations: this.state.translations,
    };
    return (
      <context.Provider value={contextValue}>
        {this.props.children}
      </context.Provider>
    );
  }

  private onEditTranslation(translationId: TranslationId) {
    const translationToEdit = this.state.translations.find((translation) => translation.id === translationId);
    this.setState({ translationToEdit });
    this.setState({ showKeyEditor: true });
  }

  private setSelectedTag(selectedTag: TranslationTag) {
    this.setState({ selectedTag });
  }

  private onSearch(value: string) {
    this.setState({ filter: value });
  }

  private onOpenKeyEditor() {
    this.setState({ translationToEdit: undefined });
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
