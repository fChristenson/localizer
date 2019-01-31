import * as React from "react";
import { KeyEditorFormRow } from "./KeyEditorFormRow";
import { TagField } from "./TagField";

export class KeyEditorFormFields extends React.PureComponent {
  public render() {
    return (
      <>
        <KeyEditorFormRow htmlFor="key" label="Key">
          <input
            autoFocus
            tabIndex={2}
            id="key"
            className="key-editor__input"
            placeholder="Key"
            type="text"
            name="key" />
        </KeyEditorFormRow>
        <KeyEditorFormRow htmlFor="translation" label="Base language value">
          <textarea
            id="translation"
            tabIndex={3}
            className="key-editor__input"
            placeholder="Base language value"
            name="translation"></textarea>
        </KeyEditorFormRow>
        <KeyEditorFormRow htmlFor="description" label="Description">
          <textarea
            id="description"
            tabIndex={4}
            className="key-editor__input"
            placeholder="Description"
            name="description"></textarea>
        </KeyEditorFormRow>
        <KeyEditorFormRow htmlFor="tags" label="Tags">
          <TagField tags={[]} />
        </KeyEditorFormRow>
      </>
    );
  }
}
