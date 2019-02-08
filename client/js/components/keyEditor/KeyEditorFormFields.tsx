import * as React from "react";
import { IKeyEditorForm } from "./IKeyEditorForm";
import { KeyEditorFormRow } from "./KeyEditorFormRow";
import { TagField } from "./TagField";
interface IKeyEditorFormFieldsProps {
  form: IKeyEditorForm;
  onChange(key: keyof IKeyEditorForm, value: string | string[]): void;
}

export class KeyEditorFormFields extends React.Component<IKeyEditorFormFieldsProps> {
  constructor(props: IKeyEditorFormFieldsProps) {
    super(props);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onTranslationChange = this.onTranslationChange.bind(this);
  }

  public render() {
    return (
      <div>
        <KeyEditorFormRow htmlFor="key" label="Key">
          <input
            autoFocus
            tabIndex={2}
            id="key"
            className="key-editor__input"
            placeholder="Key"
            value={this.props.form.key}
            onChange={this.onKeyChange}
            type="text"
            name="key" />
        </KeyEditorFormRow>
        <KeyEditorFormRow htmlFor="translation" label="Base language value">
          <textarea
            id="translation"
            tabIndex={3}
            onChange={this.onTranslationChange}
            value={this.props.form.translation}
            className="key-editor__input"
            placeholder="Base language value"
            name="translation"></textarea>
        </KeyEditorFormRow>
        <KeyEditorFormRow htmlFor="description" label="Description">
          <textarea
            id="description"
            tabIndex={4}
            onChange={this.onDescriptionChange}
            value={this.props.form.description}
            className="key-editor__input"
            placeholder="Description"
            name="description"></textarea>
        </KeyEditorFormRow>
        <KeyEditorFormRow htmlFor="tags" label="Tags">
          <TagField onChange={this.props.onChange} tags={this.props.form.tags} />
        </KeyEditorFormRow>
      </div>
    );
  }

  private onTranslationChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.onChange("translation", event.target.value || "");
  }

  private onDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.onChange("description", event.target.value || "");
  }

  private onKeyChange(event: React.ChangeEvent<HTMLInputElement>) {
    const el = event.target as HTMLInputElement;
    this.props.onChange("key", el.value);
  }
}
