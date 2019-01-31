import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { TranslationRow } from "./TranslationRow";

class TranslationListComponent extends React.PureComponent<IContextProps> {
  public render() {
    return (
      <ul className="translation-list">
        {
          this.props.context.translations
            .map((translation) => <TranslationRow key={translation.id} translation={translation} />)
        }
      </ul>
    );
  }
}

export const TranslationList = withAppContext(TranslationListComponent);
