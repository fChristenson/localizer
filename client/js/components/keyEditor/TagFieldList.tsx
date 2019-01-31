import * as React from "react";

interface ITagFieldProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

export class TagFieldList extends React.Component<ITagFieldProps> {
  constructor(props: ITagFieldProps) {
    super(props);
    this.removeTag = this.removeTag.bind(this);
  }

  public render() {
    return (
      <>
        {this.props.tags.map((tag, i) => (<li key={i} className="tag-field__tag">
          <span>{tag}</span>
          <button onClick={this.removeTag(tag)} className="tag-field__remove">×</button>
        </li>))}
      </>
    );
  }

  private removeTag(tag: string): (event: React.MouseEvent<HTMLElement>) => void {
    return (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      this.props.onRemoveTag(tag);
    };
  }
}
