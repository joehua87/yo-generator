import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Item from '../../components/Item'

storiesOf('Item', module)
  .add('Normal', () => <Item />)
