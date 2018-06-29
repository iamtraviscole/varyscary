import React, { Component } from 'react'
import { CustomPicker } from 'react-color'

import '../styles/ColorPicker.css'

const { Saturation, Hue, EditableInput } = require('react-color/lib/components/common')

class ColorPicker extends Component {
  render() {

    // const hexStyle = {
    //   input: {
    //     textAlign: 'center',
    //     height: '25px',
    //     width: '50%',
    //     // fontSize: '16px'
    //   }
    // }

    return (
      <div className='ColorPicker__ctr'>
        <div className='ColorPicker__color'>
          {/* <p>Color</p> */}
        </div>
        <div className='ColorPicker__custom-ctr'>
          <div className='ColorPicker__picker'>
            <i class="material-icons">colorize</i>
          </div>
          <div className='ColorPicker__hex-ctr'>
            <div className='ColorPicker__hex-pound'>#</div>
            <div className='ColorPicker__hex'>
              <EditableInput
                // style={ hexStyle }
                value='000000'
                onChange={ this.handleChange } />
            </div>
          </div>
        </div>
        <div className='ColorPicker__swatches-ctr'>
          <div className='ColorPicker__swatch'></div>
          <div className='ColorPicker__swatch'></div>
          <div className='ColorPicker__swatch'></div>
          <div className='ColorPicker__swatch'></div>
          <div className='ColorPicker__swatch'></div>
          <div className='ColorPicker__swatch'></div>
          <div className='ColorPicker__swatch'></div>
          <div className='ColorPicker__swatch'></div>
        </div>
        {/* <div className='ColorPicker__hex-ctr'>
          <EditableInput
            style={ hexStyle }
            value='000000'
            onChange={ this.handleChange } />
        </div> */}
      </div>
    )
  }
}

export default CustomPicker(ColorPicker)
