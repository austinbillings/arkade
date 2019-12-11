import React from 'react';

export class ProgressBar extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getPercentAtClick = this.getPercentAtClick.bind(this);
  }

  outerStyle () {
    let { radius, background, height } = this.props;
    return {
      display: 'block',
      width: '100%',
      overflow: 'hidden',
      borderRadius: radius + 'px',
      backgroundColor: background,
      height: height + 'px'
    }
  }

  innerStyle (percent) {
    let { color } = this.props;
    return {
      display: 'block',
      width: percent + '%',
      backgroundColor: color,
      height: '100%',
      pointerEvents: 'none',
      transition: 'all 0.2s ease',
      WebkitTransition: 'all 0.2s ease',
    }
  }

  getPercentAtClick (e) {
    let { offsetX, target } = e.nativeEvent
    let width = target.clientWidth;
    let percent = offsetX / width * 100;
    return percent;
  }

  handleClick (e) {
    let percent = this.getPercentAtClick(e);
    let newEvent = Object.assign({}, e, { scrubPosition: percent / 100 });
    if (this.props.interactive && this.props.onScrub) this.props.onScrub(newEvent);
  }

  render () {
    let { percent } = this.props;
    return (
      <div className={this.props.className}>
        <div className="progress-bar" onClick={this.handleClick} style={this.outerStyle()}>
          <div className="progress-bar-inner" style={this.innerStyle(percent)}> </div>
        </div>
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  height: 10,
  color: '#aaa',
  radius: 5,
  background: 'rgba(0,0,0,0.3)',
  className: 'progress-bar-outer'
}
