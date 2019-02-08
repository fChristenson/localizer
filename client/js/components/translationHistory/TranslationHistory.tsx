import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { getAllTranslations, updateTranslationText } from "../../lib/api/translationApi";
import { hasText, sortByCreatedAt, TranslationText } from "../../lib/models/TranslationText";
import { Dialog, DialogFooter, DialogHeader } from "../dialog";
import { TranslationHistoryRow } from "./TranslationHistoryRow";

class TranslationHistoryComponent extends React.Component<IContextProps> {
  constructor(props: IContextProps) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRevert = this.onRevert.bind(this);
  }

  public render() {
    const translations = this.props.context.selectedTranslationHistory &&
      this.props.context.selectedTranslationHistory.translations || [];

    return (
      <Dialog show={this.props.context.showTranslationHistory} onClose={this.onClose}>
        <form noValidate onSubmit={this.onSubmit}>
          <DialogHeader onClose={this.onClose} title="Translation history" />
          <ul className="translation-history__values">
            {
              translations
                .sort(sortByCreatedAt)
                .filter(hasText)
                .map((e, i) => {
                  if (i === 0) {
                    return <TranslationHistoryRow
                      onRevert={this.onRevert}
                      key={e.id}
                      tabIndex={i + 1}
                      showRevert={false}
                      translationText={e} />;
                  } else {
                    return <TranslationHistoryRow
                      onRevert={this.onRevert}
                      key={e.id}
                      tabIndex={i + 1}
                      showRevert={true}
                      translationText={e} />;
                  }
                })
            }
          </ul>
          <DialogFooter tabIndex={translations.length + 1} submitButtonText="Done" />
        </form>
      </Dialog>
    );
  }

  private async onRevert(translationText: TranslationText) {
    const history = this.props.context.selectedTranslationHistory;
    if (history) {
      await updateTranslationText(history.translationId, translationText);
      const translations = await getAllTranslations();
      this.props.context.setTranslations(translations);
      this.props.context.onCloseTranslationHistory();
    }
  }

  private onClose(event: React.MouseEvent<HTMLElement>): boolean {
    event.preventDefault();
    event.stopPropagation();
    this.props.context.onCloseTranslationHistory();
    return false;
  }

  private async onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<boolean> {
    event.preventDefault();
    event.stopPropagation();
    const translations = await getAllTranslations();
    this.props.context.setTranslations(translations);
    this.props.context.onCloseTranslationHistory();
    return false;
  }
}

export const TranslationHistory = withAppContext(TranslationHistoryComponent);
