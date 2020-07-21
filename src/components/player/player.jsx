import React from 'react';
import PropTypes from 'prop-types';

import {timeLeftFormat} from '../../utils';

const Player = (props) => {
  const {children, isPlaying, onTogglePlaying, name, progress, duration, onChangeFullScreen} = props;

  return (
    <div className="player">
      <div className="player__video" style={{backgroundColor: `black`}}>
        {children}
      </div>

      <button
        type="button"
        className="player__exit"
        onClick={() => props.history.goBack()}
      >Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={duration}/>
            <div className="player__toggler" style={{left: `${(progress * 100) / duration}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeftFormat(progress, duration)}</div>
        </div>

        <div className="player__controls-row">
          {!isPlaying
            ?
            <button type="button" className="player__play" onClick={onTogglePlaying}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
              <span>Play</span>
            </button>
            :
            <button type="button" className="player__play" onClick={onTogglePlaying}>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"/>
              </svg>
              <span>Pause</span>
            </button>
          }
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen" onClick={onChangeFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  children: PropTypes.node.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onTogglePlaying: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChangeFullScreen: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Player;
