import { app } from 'hyperapp'
import view from './view'
import actions from './actions'
import './main.scss'

const root = document.querySelector('#root')
const defaultPhoto = 'https://goo.gl/hzdhi1'
const state = {
  regions: [],
  user: {
    photo: defaultPhoto,
    gender: 'female'
  },
  disabled: false
}

app(
  {
    state,
    view,
    actions
  }, 
  root
).load('Canada')
