import { takeLatest, put, call } from 'redux-saga/effects';

import api from '../api';

const LOAD_TEMPLATES = 'LOAD_TEMPLATES';
const LOAD_TEMPLATES_SUCCESS = 'LOAD_TEMPLATES_SUCCESS';
const LOAD_TEMPLATES_FAILURE = 'LOAD_TEMPLATES_FAILURE';

const LOAD_HOUSES = 'LOAD_HOUSES';
const LOAD_HOUSES_SUCCESS = 'LOAD_HOUSES_SUCCESS';
const LOAD_HOUSES_FAILURE = 'LOAD_HOUSES_FAILURE';

const initialState = {
  templates: [],
  houses: [],
  error: null,
  loading: false,
};

export function templatesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TEMPLATES:
    case LOAD_HOUSES:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_TEMPLATES_SUCCESS:
    case LOAD_HOUSES_SUCCESS:
      const newState = {};
      Object.keys(action)
        .filter(key => key !== 'type')
        .forEach(key => newState[key] = action[key]);

      return {
        ...state,
        ...newState,
        loading: false,
        error: null
      };

    case LOAD_TEMPLATES_FAILURE:
    case LOAD_HOUSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}

export function* fetchTemplates() {
  const result = yield call(api.fetchData, 'templates');
  if (result) {
    yield put({ type: LOAD_TEMPLATES_SUCCESS, templates: result || [] })
  } else {
    yield put({ type: LOAD_TEMPLATES_FAILURE, error: 'Templates cannot be loaded. Something went wrong' })
  }
}

export function* fetchHouses() {
  const result = yield call(api.fetchData, 'properties');
  if (result) {
    yield put({ type: LOAD_HOUSES_SUCCESS, houses: result.data || [] })
  } else {
    yield put({ type: LOAD_HOUSES_FAILURE, error: 'Houses cannot be loaded. Something went wrong' })
  }
}

export function* watchRequest() {
  yield takeLatest(LOAD_TEMPLATES, fetchTemplates);
  yield takeLatest(LOAD_HOUSES, fetchHouses);
}

export function onTemplatesFetch() {
  return {
    type: LOAD_TEMPLATES
  };
}

export function onHousesFetch() {
  return {
    type: LOAD_HOUSES
  };
}
