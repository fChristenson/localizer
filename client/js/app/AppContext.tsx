import * as React from "react";
import { ITranslationHistory } from "../components/translationHistory/ITranslationHistory";
import { Translation, TranslationId, TranslationTag } from "../lib/models/Translation";
import { Language } from "../lib/models/TranslationText";

export interface IAppContext {
  onCloseKeyEditor: () => void;
  onOpenKeyEditor: () => void;
  onOpenTranslationHistory: (translationId: TranslationId, language: Language) => void;
  onEditTranslation: (translationId: TranslationId) => void;
  setTranslations: (translations: Translation[]) => void;
  setSelectedTag: (tag: TranslationTag) => void;
  onCloseTranslationHistory: () => void;
  onSearch: (value: string) => void;
  selectedTranslationHistory: ITranslationHistory | undefined;
  translationToEdit?: Translation;
  showKeyEditor: boolean;
  showTranslationHistory: boolean;
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
  showTranslationHistory: boolean;
  translations: Translation[];
  selectedTranslationHistory: ITranslationHistory | undefined;
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
    this.state = {
      filter: "",
      selectedTag: "",
      selectedTranslationHistory: undefined,
      showKeyEditor: false,
      showTranslationHistory: false,
      translations: [],
    };
    this.onSearch = this.onSearch.bind(this);
    this.onEditTranslation = this.onEditTranslation.bind(this);
    this.onCloseKeyEditor = this.onCloseKeyEditor.bind(this);
    this.onCloseTranslationHistory = this.onCloseTranslationHistory.bind(this);
    this.onOpenTranslationHistory = this.onOpenTranslationHistory.bind(this);
    this.onOpenKeyEditor = this.onOpenKeyEditor.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.setTranslations = this.setTranslations.bind(this);
  }

  public render() {
    const contextValue: IAppContext = {
      filter: this.state.filter,
      onCloseKeyEditor: this.onCloseKeyEditor,
      onCloseTranslationHistory: this.onCloseTranslationHistory,
      onEditTranslation: this.onEditTranslation,
      onOpenKeyEditor: this.onOpenKeyEditor,
      onOpenTranslationHistory: this.onOpenTranslationHistory,
      onSearch: this.onSearch,
      selectedTag: this.state.selectedTag,
      selectedTranslationHistory: this.state.selectedTranslationHistory,
      setSelectedTag: this.setSelectedTag,
      setTranslations: this.setTranslations,
      showKeyEditor: this.state.showKeyEditor,
      showTranslationHistory: this.state.showTranslationHistory,
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

  private onOpenTranslationHistory(translationId: TranslationId, language: Language) {
    const translation = this.state.translations.find((t) => t.id === translationId);
    if (!translation) {
      throw new Error(`${translationId} could not be found`);
    }
    const translations = translation.translations.filter((t) => t.language === language);
    const history: ITranslationHistory = { translationId, translations };
    this.setState({ showTranslationHistory: true, selectedTranslationHistory: history });
  }

  private onOpenKeyEditor() {
    this.setState({ translationToEdit: undefined });
    this.setState({ showKeyEditor: true });
  }

  private onCloseTranslationHistory() {
    this.setState({ showTranslationHistory: false, selectedTranslationHistory: undefined });
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
