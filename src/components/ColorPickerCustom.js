import React, { Component, Fragment } from 'react'
import { CustomPicker } from 'react-color'

import '../styles/ColorPickerCustom.css'

import HueCustomPointer from './HueCustomPointer.js'
import SatCustomPointer from './SatCustomPointer.js'

const { Saturation, Hue, EditableInput } = require('react-color/lib/components/common')

class ColorPickerCustom extends Component {
  render() {
    return (
      <Fragment>
        <div className='ColorPickerCustom__sat-ctr'>
          <Saturation
            {...this.props}
            pointer={SatCustomPointer} />
        </div>
        <div className='ColorPickerCustom__hue-ctr'>
          <Hue
            {...this.props}
            pointer={HueCustomPointer}
            direction={'horizontal'} />
        </div>
        <div className='ColorPickerCustom__hex-ctr'>
          <EditableInput
            value={this.props.hex} />
        </div>
      </Fragment>
    )
  }
}

export default CustomPicker(ColorPickerCustom)
