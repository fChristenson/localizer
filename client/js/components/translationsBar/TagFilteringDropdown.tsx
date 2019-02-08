import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { Translation, TranslationTag } from "../../lib/models/Translation";

interface ITagFilteringDropdownProps extends IContextProps {
  onClose: () => void;
}

const getTags = (acc: TranslationTag[], item: Translation) => {
  return acc.concat(item.tags).filter((val, index, self) => self.indexOf(val) === index);
};

class TagFilteringDropdownComponent extends React.Component<ITagFilteringDropdownProps> {
  constructor(props: ITagFilteringDropdownProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  public componentDidMount() {
    document.addEventListener("click", this.props.onClose);
  }

  public componentWillMount() {
    document.removeEventListener("click", this.props.onClose);
  }

  public render() {
    return (
      <div className="tag-filtering-dropdown">
        <ul className="tag-filtering-dropdown__ul">
          {
            this.props.context.translations.reduce(getTags, []).map((tag, i) => {
              return <li key={i} onClick={this.onSelect} className="tag-filtering-dropdown__li">{tag}</li>;
            })
          }
        </ul>
      </div>
    );
  }

  private onSelect(event: React.MouseEvent<HTMLElement>) {
    const value = (event.target as HTMLElement).textContent || "";
    this.props.context.setSelectedTag(value);
  }
}

export const TagFilteringDropdown = withAppContext(TagFilteringDropdownComponent);
