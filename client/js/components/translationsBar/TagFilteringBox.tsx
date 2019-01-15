import * as React from "react";
import { BadgeButton, BadgeButtonVariant } from "../badgeButton/BadgeButton";
import { TagFilteringDropdown } from "./TagFilteringDropdown";
import { TagName } from "./TagName";

interface ITagFilteringBoxState {
  selectedTag: string;
  showDropdown: boolean;
}

export class TagFilteringBox extends React.Component<any, ITagFilteringBoxState> {
  constructor(props: any) {
    super(props);
    this.state = { selectedTag: "", showDropdown: false };
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.selectTag = this.selectTag.bind(this);
    this.resetSelectedTag = this.resetSelectedTag.bind(this);
  }

  public render() {
    const variant = this.state.selectedTag === "" ? undefined : BadgeButtonVariant.ACTIVE;
    return (
      <div className="tag-filtering-box">
        <BadgeButton onClick={this.showDropdown} id="tag-filtering-box__filter-btn" variant={variant}>
          <span className="tag-filtering-box__filter">
            Filter
            <TagName tag={this.state.selectedTag} />
          </span>
          <span className="tag-filtering-box__chevron"></span>
        </BadgeButton>
        {this.state.selectedTag && <button
          onClick={this.resetSelectedTag}
          className="tag-filtering-box__close" />}
        {this.state.showDropdown && <TagFilteringDropdown onClose={this.hideDropdown} onTagSelect={this.selectTag} />}
      </div>
    );
  }

  private resetSelectedTag() {
    this.setState({ selectedTag: "", showDropdown: false });
  }

  private showDropdown() {
    this.setState({ showDropdown: true });
  }

  private hideDropdown() {
    this.setState({ showDropdown: false });
  }

  private selectTag(selectedTag: string) {
    this.setState({ selectedTag });
  }
}
