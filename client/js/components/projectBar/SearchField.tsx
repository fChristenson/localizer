import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";

class SearchFieldComponent extends React.Component<IContextProps> {
  constructor(props: IContextProps) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  public render() {
    return (
      <form noValidate>
        <input onKeyUp={this.onSearch} type="text" placeholder="Search" className="project-bar__searchfield" />
      </form>
    );
  }

  private onSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    const el = event.target as HTMLInputElement;
    this.props.context.onSearch(el.value);
  }
}

export const SearchField = withAppContext(SearchFieldComponent);
