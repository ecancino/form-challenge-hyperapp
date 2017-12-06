import { section, input, label, select, option, span } from '@hyperapp/html'
import { equals, map, concat, pick, tryCatch, always, lensPath } from 'ramda'
import { all } from 'bluebird' 

const stringify = o => JSON.stringify(o, null, 2)
export const toJSON = tryCatch(stringify, always({}))

const fetchJSON = url => fetch(url).then(r => r.json())
const formatUser = pick(['photo', 'name', 'surname', 'email', 'phone', 'region', 'gender'])
const loadUser = (region = '') => fetchJSON(`https://uinames.com/api/?ext${region && `&region=${region}` }`).then(formatUser) 
const loadRegions = () => fetchJSON('https://restcountries.eu/rest/v2/all')

export const loadState = region => all([loadUser(region), loadRegions()])

const createSection = children =>
  section({ className: 'column column-100' }, children)

export const createInput = (name, placeholder, value, oninput) => 
  createSection([
    label({ for: name }, placeholder),
    input({ id: name, name, value, placeholder, oninput, type: 'text' })
  ])

const createOption = value => ({ name }) =>
  option({ value: name, selected: equals(value, name) }, [ name ])

export const createSelect = (name, options, value, placeholder, empty, onchange) =>
  createSection([
    label({ for: name }, placeholder),
    select({ id: name, onchange }, map(createOption(value), concat([empty], options)))
  ])
  
const radioButton = ({ id, name, value, placeholder, checked, onclick }) =>
  span([
    input({ id, name, value, type: 'radio', checked, onclick }),
    label({ for: id, className: 'label-inline' }, placeholder)
  ])

export const createRadio = (name, placeholder, options) =>
  createSection([
    label({ for: name }, placeholder),
    createSection(map(radioButton, options))
  ])

export const genderOptions = (gender, onclick) => [
  { id: 'female', name: 'gender', placeholder: 'Female', value: 'female', checked: gender === 'female', onclick  },
  { id: 'male', name: 'gender', placeholder: 'Male', value: 'male', checked: gender === 'male', onclick }
]

const lenseFor = prop => lensPath(['user', prop])
export const updateProp = (prop, fn) => ({ target: { value } }) => fn({ lens: lenseFor(prop), value })