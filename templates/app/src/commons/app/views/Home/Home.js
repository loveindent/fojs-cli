import React from 'react'

import {
  Button
} from '../../../components'

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Button modifiers="chips">Hello</Button>
      </div>
    )
  }
}
