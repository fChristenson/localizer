import * as React from "react";
import { IContextProps, withAppContext } from "../../app/AppContext";
import { BadgeButton, BadgeButtonVariant } from "../badgeButton/BadgeButton";
import { TagFilteringDropdown } from "./TagFilteringDropdown";
import { TagName } from "./TagName";

interface ITagFilteringBoxState {
  showDropdown: boolean;
}

class TagFilteringBoxComponent extends React.Component<IContextProps, ITagFilteringBoxState> {
  constructor(props: IContextProps) {
    super(props);
    this.state = { showDropdown: false };
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.resetSelectedTag = this.resetSelectedTag.bind(this);
  }

  public render() {
    const variant = this.props.context.selectedTag === "" ? undefined : BadgeButtonVariant.ACTIVE;
    return (
      <div className="tag-filtering-box">
        <BadgeButton onClick={this.showDropdown} id="tag-filtering-box__filter-btn" variant={variant}>
          <span className="tag-filtering-box__filter">
            Filter
            <TagName tag={this.props.context.selectedTag} />
          </span>
          <span className="tag-filtering-box__chevron"></span>
        </BadgeButton>
        {this.props.context.selectedTag && <button
          onClick={this.resetSelectedTag}
          className="tag-filtering-box__close" />}
        {this.state.showDropdown && <TagFilteringDropdown onClose={this.hideDropdown} />}
      </div>
    );
  }

  private resetSelectedTag() {
    this.setState({ showDropdown: false });
    this.props.context.setSelectedTag("");
  }

  private showDropdown() {
    this.setState({ showDropdown: true });
  }

  private hideDropdown() {
    this.setState({ showDropdown: false });
  }
}

export const TagFilteringBox = withAppContext(TagFilteringBoxComponent);
