import {combineReducers} from 'redux';

import NameSpace from './name-space';
import {reducer as data} from './data/data';

export default combineReducers({
  [NameSpace.DATA]: data,
});
