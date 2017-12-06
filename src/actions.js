import { loadState } from './helpers'
import { curry, merge, set } from 'ramda'

const setState = curry(([ user, regions ], state) => 
  merge(state, { user, regions }))

const load = curry((region, state, { setState }) => 
  loadState(region).then(setState))

const updateUser = curry(({ lens, value }, state) => set(lens, value, state))

const disableForm = () => state => merge(state, { disabled: !state.disabled })

export default { load, setState, updateUser, disableForm }