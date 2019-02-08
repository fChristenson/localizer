import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { getAllTranslations, saveTranslation, updateTranslation } from "../../lib/api/translationApi";
import { Language } from "../../lib/models/TranslationText";
import { Dialog, DialogFooter, DialogHeader } from "../dialog";
import { IKeyEditorForm } from "./IKeyEditorForm";
import { KeyEditorFormFields } from "./KeyEditorFormFields";

interface IKeyEditorComponentState {
  form: IKeyEditorForm;
}

const initForm = { key: "", translation: "", description: "", tags: [] };
class KeyEditorComponent extends React.Component<IContextProps, IKeyEditorComponentState> {
  constructor(props: IContextProps) {
    super(props);
    const state = { form: initForm };
    this.state = state;
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  public componentWillReceiveProps(props: IContextProps) {
    if (props.context.translationToEdit) {
      const translation = props.context.translationToEdit.translations.find((t) => t.language === Language.ENGLISH);
      if (translation) {
        const state = {
          form: {
            description: props.context.translationToEdit.description,
            key: props.context.translationToEdit.translationKey,
            tags: props.context.translationToEdit.tags,
            translation: translation.text,
          },
        };
        this.setState(state);
      }
    } else {
      this.setState({ form: initForm });
    }
  }

  public render() {
    return (
      <Dialog show={this.props.context.showKeyEditor} onClose={this.onClose}>
        <form noValidate onSubmit={this.onSubmit}>
          <DialogHeader onClose={this.onClose} title="Key editor" />
          <KeyEditorFormFields form={this.state.form} onChange={this.onChange} />
          <DialogFooter tabIndex={6} submitButtonText="Save" />
        </form>
      </Dialog>
    );
  }

  private onChange(key: keyof IKeyEditorForm, value: string | string[]) {
    const state = { ...this.state };
    state.form[key] = value;
    this.setState(state);
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
    const {
      key,
      translation,
      description,
      tags,
    } = this.state.form;

    if (this.props.context.translationToEdit) {
      const id = this.props.context.translationToEdit.id;
      const translationText = this.props.context.translationToEdit
        .translations.find((t) => t.language === Language.ENGLISH);
      if (!translationText) {
        throw new Error("Couldn't find a translation text in English");
      }
      translationText.text = translation;
      await updateTranslation(id, key, translationText, description, tags);
    } else {
      await saveTranslation(key, translation, description, tags);
    }
    const translations = await getAllTranslations();
    this.props.context.setTranslations(translations);
    this.props.context.onCloseKeyEditor();
    return false;
  }
}

export const KeyEditor = withAppContext(KeyEditorComponent);
