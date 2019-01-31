import * as React from "react";
import { TagFieldList } from "./TagFieldList";
import { TagLabel } from "./TagLabel";

interface ITagFieldProps {
  tags: string[];
}

interface ITagState {
  tags: string[];
  value: string;
  showTagsLabel: boolean;
}

export class TagField extends React.Component<ITagFieldProps, ITagState> {
  constructor(props: ITagFieldProps) {
    super(props);
    const showTagsLabel = props.tags.length <= 0;
    this.state = { tags: props.tags, value: "", showTagsLabel };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.changeText = this.changeText.bind(this);
    this.hideTagsLabel = this.hideTagsLabel.bind(this);
    this.showTagsLabel = this.showTagsLabel.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  public render() {
    return (
      <ul className="tag-field">
        <TagLabel show={this.state.showTagsLabel} />
        <TagFieldList onRemoveTag={this.removeTag} tags={this.state.tags} />
        <li className="tag-field__input-li">
          <input
            onFocus={this.hideTagsLabel}
            value={this.state.value}
            onBlur={this.showTagsLabel}
            onChange={this.changeText}
            onKeyUp={this.onKeyUp}
            tabIndex={5}
            className="tag-field__input"
            id="tags"
            type="text"
            name="tags" />
          <input value={this.state.tags.join(",")} name="tag-values" type="hidden" />
        </li>
      </ul>
    );
  }

  private hideTagsLabel() {
    this.setState({ showTagsLabel: false });
  }

  private showTagsLabel() {
    const showTagsLabel = this.state.tags.length <= 0;
    const inputEmpty = this.state.value.length <= 0;
    this.setState({ showTagsLabel: showTagsLabel && inputEmpty });
  }

  private onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const el = (event.target as HTMLInputElement);
    const text = el.value;
    const hasBreak = /[\s,]$/.test(text);

    if (hasBreak) {
      const tag = text.replace(/[\s,]/, "");
      this.setState({ tags: this.state.tags.concat(tag), value: "" });
      el.focus();
    }
  }

  private changeText(event: React.ChangeEvent) {
    const value = (event.nativeEvent.target as HTMLInputElement).value || "";
    this.setState({ value });
    this.setState({ showTagsLabel: false });
  }

  private removeTag(tag: string) {
    const tags = this.state.tags.filter((stateTag) => stateTag !== tag);
    const showTagsLabel = tags.length <= 0;
    this.setState({ showTagsLabel, tags });
  }
}
