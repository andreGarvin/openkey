import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

// reducers
import notificationReducer from './reducers/notification';
import formErrorReducer from './reducers/form-error';
import feedbackReducer from './reducers/feedback';
import navigateReducer from './reducers/navigate';
import reportReducer from './reducers/report';
import keyReducer from './reducers/key';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    key: keyReducer,
    report: reportReducer,
    navigate: navigateReducer,
    feedback: feedbackReducer,
    formError: formErrorReducer,
    notification: notificationReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export const mapStateToProps = (state) => ({ state });

export const connection = connect(mapStateToProps);
