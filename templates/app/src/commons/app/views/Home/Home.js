import React from 'react'

import {
  Button
} from '../../../../components'

import { Navigation } from '../components'

export default class Home extends React.Component {
  render() {
    return (
          <div>
            <Button modifiers="chips">Hello</Button>
          </div>
    )
  }
}
