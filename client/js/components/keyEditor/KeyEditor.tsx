import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { getAllTranslations, saveTranslation } from "../../lib/api/translationApi";
import { BadgeButton } from "../badgeButton/BadgeButton";
import { KeyEditorFormFields } from "./KeyEditorFormFields";

interface IKeyEditorProps extends IContextProps {
  show: boolean;
}

export class KeyEditorComponent extends React.Component<IKeyEditorProps> {
  constructor(props: IKeyEditorProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  public render() {
    if (this.props.show === false) {
      return null;
    }

    return (
      <div className="key-editor">
        <div className="key-editor__click-catcher" onClick={this.onClose}></div>
        <form noValidate className="key-editor__dialog" onSubmit={this.onSubmit}>
          <header className="key-editor__header">
            <h2 className="key-editor__title">Key editor</h2>
            <button onClick={this.onClose} className="key-editor__close" tabIndex={1}>×</button>
          </header>
          <div className="key-editor__content">
            <KeyEditorFormFields />
          </div>
          <footer className="key-editor__footer">
            <BadgeButton tabIndex={6}>Save</BadgeButton>
          </footer>
        </form>
      </div>
    );
  }

  private onClose(event: React.MouseEvent<HTMLElement>): boolean {
    event.preventDefault();
    event.stopPropagation();
    this.props.context.onCloseKeyEditor();
    return false;
  }

  private async onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<boolean> {
    event.preventDefault();
    event.stopPropagation();
    const el = event.target as HTMLFormElement;
    const key = el.key.value;
    const translation = el.translation.value;
    const description = el.description.value;
    const tags = el["tag-values"].value.split(",").filter((val: string) => val);

    await saveTranslation(key, translation, description, tags);
    const translations = await getAllTranslations();
    this.props.context.setTranslations(translations);
    this.props.context.onCloseKeyEditor();
    return false;
  }
}

export const KeyEditor = withAppContext(KeyEditorComponent);
