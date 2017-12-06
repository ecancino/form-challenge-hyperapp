import { h, app } from 'hyperapp'
import { section, h1, img, input, label, button, pre, fieldset } from '@hyperapp/html'
import { createInput, createSelect, createRadio, genderOptions, toJSON, updateProp } from './helpers'
import { curry, merge } from 'ramda'

import Footer from './Footer'

export default curry(({ user, regions, disabled }, { load, updateUser, disableForm }) =>
  section({ className: 'column' }, [
    section({ className: 'row' }, [
      fieldset({ className: 'column column-100', disabled }, [
        img({ className: 'avatar', src: user.photo }),
        section({ className: 'row' }, [
          createInput('firstname', 'Firstname', user.name, updateProp('name', updateUser)),
          createInput('lastname', 'Lastname', user.surname, updateProp('surname', updateUser))
        ]),
        section({ className: 'row' }, [
          createInput('email', 'Email', user.email, updateProp('email', updateUser)),
          createInput('phone', 'Phone', user.phone, updateProp('phone', updateUser))
        ]),
        section({ className: 'row' }, [
          createSelect('region', regions, user.region, 'Regions', { name: 'Unknown' }, updateProp('region', updateUser)),
          createRadio('gender', 'Gender', genderOptions(user.gender, updateProp('gender', updateUser)))
        ]),
        section([
          button({ className: 'float-right', onclick: () => load() }, 'Load')
        ]),
        section({ className: 'row' }, [
          pre({ className: 'row' }, toJSON(user))
        ])
      ])
    ]),
    section({ className: 'row' }, [
      h(Footer, { state: { disabled }, actions: { disableForm }, name: 'Disable' })
    ])
  ])
)
