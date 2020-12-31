import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

// reducers
import formErrorReducer from './reducers/form-error';
import feedbackReducer from './reducers/feedback';
import navigateReducer from './reducers/navigate';
import reportReducer from './reducers/report';
import errorReducer from './reducers/error';
import keyReducer from './reducers/key';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    key: keyReducer,
    error: errorReducer,
    report: reportReducer,
    navigate: navigateReducer,
    feedback: feedbackReducer,
    formError: formErrorReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export const mapStateToProps = (state) => ({ state });

export const connection = connect(mapStateToProps);
