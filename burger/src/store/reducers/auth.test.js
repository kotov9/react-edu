import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


configure({adapter: new Adapter()});

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      userId: null,
      token: null,
      loading: false,
      error: null,
      redirectAuthPath: "/"
    })
  });
  
  it('should store token upon login', () => {
    expect(reducer({
      userId: null,
      token: null,
      loading: false,
      error: null,
      redirectAuthPath: "/"
    }, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-id'
    })).toEqual({
      userId: 'some-id',
      token: 'some-token',
      loading: false,
      error: null,
      redirectAuthPath: "/"})
  })
})