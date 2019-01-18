import * as React from "react";

function getRandomBrightColor() {
  const random1 = Math.floor(Math.random() * 360);
  const random2 = Math.floor(Math.random() * 10) + 65;
  const random3 = Math.floor(Math.random() * 10) + 65;

  return `hsl(${random1},${random2}%,${random3}%)`;
}

export class TranslationMetaBar extends React.PureComponent {
  public render() {
    return (
      <div className="meta-bar">
        <button className="meta-bar__key">key.for.translation</button>
        <ul className="meta-bar__tags">
          <li style={{ background: getRandomBrightColor() }} className="meta-bar__tag">tag foobar</li>
          <li style={{ background: getRandomBrightColor() }} className="meta-bar__tag">tag foobar</li>
          <li style={{ background: getRandomBrightColor() }} className="meta-bar__tag">tag foobar</li>
          <li style={{ background: getRandomBrightColor() }} className="meta-bar__tag">tag foobar</li>
        </ul>
        <div className="meta-bar__description">The title of my bookstore app</div>
        <ul className="meta-bar__action-list">
          <li>
            <button className="meta-bar__trash-btn">
              <img className="meta-bar__trash-img" src="/images/trash.svg" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
