import { section, button } from '@hyperapp/html'

const Footer = ({ state, actions, name }, children) =>
  section([
    button({
      onclick (e) {
        e.stopPropagation()
        actions.disableForm()
      }
    }, name)
  ])

export default Footer
