import {combineReducers} from 'redux';

import NameSpace from './name-space';
import {reducer as data} from './data/data';
import {reducer as user} from './user/user';
import {reducer as reviews} from './reviews/reviews';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
  [NameSpace.REVIEWS]: reviews,
});
