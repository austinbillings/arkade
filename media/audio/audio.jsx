import React from 'react';

import { Icon, ProgressBar } from 'arkade/components/common';

import './audio.scss';

export class Audio extends React.Component {
  constructor () {
    super();
    this.state = { playing: false, position: 0, time: '0:00' }
    this.player = null;
    this.interval = null;

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.handleBackward = this.handleBackward.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleScrub = this.handleScrub.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }

  componentDidUpdate (oldProps) {
    if (oldProps.src !== this.props.src) {
      setTimeout(() => { this.handlePlay(); }, 100);
    }
  }

  componentDidMount () {
    this.player = this.refs.player;
    this.player.addEventListener('play', () => {
      this.updatePosition();
      this.setState({ playing: true });
      this.interval = setInterval(this.updatePosition, 1000);
    });
    this.player.addEventListener('pause', () => {
      clearInterval(this.interval);
    });
  }

  updatePosition () {
    let time = this.player.currentTime;
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    seconds = seconds < 10 ? '0' + seconds.toString() : seconds;

    let position = this.getCurrentTrackPosition();

    time = `${minutes}:${seconds}`;
    this.setState({ position, time: time });
  }

  handleBackward () {
    if (!this.player || !this.player.duration) return;

    this.player.currentTime = 0;
    this.setState({ playing: this.state.playing });
  }

  getCurrentTrackPosition () {
    if (!this.player || !this.player.duration) return;
    let { currentTime, duration } = this.player;
    let percent = (currentTime / duration * 100).toFixed(2);
    return percent;
  }

  handlePlay () {
    if (!this.player || !this.player.duration) return;
    this.player.play();
    this.setState({ playing: true });
  }

  handlePause () {
    if (!this.player || !this.player.duration) return;
    this.player.pause();
    this.setState({ playing: false });
  }

  handleScrub (e) {
    let position = e.scrubPosition;
    let newTime = position * this.player.duration;
    this.player.currentTime = newTime;
    this.updatePosition();
  }

  getClassName () {
    let className = 'Audio';
    if (this.props.className) className += ' ' + this.props.className;
    if (this.state.playing) className += ' playing';
    else if (this.player && this.player.currentTime != 0) className += ' paused';
    if (!this.player || !this.player.duration) className += ' empty';
    return className;
  }

  render () {
    return (
      <box className={this.getClassName()}>
        <box className="Audio-Player">
          <audio className="box" src={this.props.src} ref="player" />
        </box>
        <box className="Audio-Controls">
          <Icon fa="backward" onClick={this.handleBackward} />
          <Icon fa="play" onClick={this.handlePlay} />
          <Icon fa="pause" onClick={this.handlePause} />
        </box>
        {this.props.title && <b className="Audio-Title">{this.props.title}</b>}
        <time className="Audio-Time">
            {this.state.time}
            {this.props.length && <span>/{this.props.length}</span>}
        </time>
        <ProgressBar height={5} color={'rgb(221, 44, 50)'} className="Audio-Progress" percent={this.state.position} interactive onScrub={this.handleScrub} />
      </box>
    )
  }
};
