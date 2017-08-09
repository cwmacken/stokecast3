import { combineReducers } from 'redux'
import sampleOne from './sampleOne'
import sampleTwo from './sampleTwo'
import auth from './auth'
import endpoint from './endpointSample'
import swell from './swell'
import wind from './wind'

const sampleApp = combineReducers({
  sampleOne,
  sampleTwo,
  auth,
  endpoint,
  swell,
  wind
})

export default sampleApp
