import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { getAllTranslations, updateTranslationText } from "../../lib/api/translationApi";
import { TranslationId } from "../../lib/models/Translation";
import { TranslationText } from "../../lib/models/TranslationText";

interface ITranslationValueProps extends IContextProps {
  translationId: TranslationId;
  translationText: TranslationText;
}

interface ITranslationValueState {
  edit: boolean;
  value: string;
}

class TranslationValueComponent extends React.Component<ITranslationValueProps, ITranslationValueState> {
  constructor(props: ITranslationValueProps) {
    super(props);
    this.state = { edit: false, value: props.translationText.text || "" };
    this.onEdit = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const btnClassName = this.state.value ? "translation-value__btn" : "translation-value__btn--empty";
    return (
      <>
        {
          !this.state.edit &&
          <button onClick={this.onEdit} className={btnClassName}>{this.state.value || "Empty"}</button>
        }
        {
          this.state.edit &&
          <form className="translation-value__form" onSubmit={this.onSubmit}>
            <input
              autoFocus
              onChange={this.onChange}
              onBlur={this.onSubmit}
              className="translation-value__edit"
              type="text"
              value={this.state.value} />
          </form>
        }
      </>
    );
  }

  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  private onEdit() {
    this.setState({ edit: true });
  }

  private async onSubmit(event: React.FormEvent): Promise<boolean> {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ edit: false });
    const { translationId, translationText } = this.props;

    if (translationText.text !== this.state.value) {
      const clone = translationText.clone();
      clone.text = this.state.value;
      await updateTranslationText(translationId, clone);
      const translations = await getAllTranslations();
      this.props.context.setTranslations(translations);
    }
    return false;
  }
}

export const TranslationValue = withAppContext(TranslationValueComponent);
