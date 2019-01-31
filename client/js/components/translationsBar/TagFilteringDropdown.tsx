import * as React from "react";

interface ITagFilteringDropdownProps {
  onTagSelect: (selectedTag: string | null) => void;
  onClose: () => void;
}

export class TagFilteringDropdown extends React.Component<ITagFilteringDropdownProps> {
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
          <li onClick={this.onSelect} className="tag-filtering-dropdown__li">foo</li>
          <li onClick={this.onSelect} className="tag-filtering-dropdown__li">bar</li>
        </ul>
      </div>
    );
  }

  private onSelect(event: React.MouseEvent<HTMLElement>) {
    this.props.onTagSelect((event.target as HTMLElement).textContent);
  }
}
