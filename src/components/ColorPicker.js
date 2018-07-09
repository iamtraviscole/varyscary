import React, { Component, Fragment } from 'react'
import { CustomPicker } from 'react-color'

import '../styles/ColorPicker.css'

import HueCustomPointer from './HueCustomPointer.js'
import SatCustomPointer from './SatCustomPointer.js'

const { Saturation, Hue, EditableInput } = require('react-color/lib/components/common')

class ColorPicker extends Component {

  state = {
    showSwatches: true,
    showPicker: false
  }

  handleSwatchesBtnClick = () => {
    this.setState({
      showSwatches: true,
      showPicker: false
    })
  }

  handlePickerBtnClick = () => {
    this.setState({
      showSwatches: false,
      showPicker: true
    })
  }

  render() {
    let colors = [
      '#80f0ff', '#2e7bed', '#034887', '#01ff70', '#32cd32', '#136b48',
      '#fffc00', '#ff9900', '#af5a03', '#f29090', '#fa3232', '#a20303',
      '#f892fa', '#d808eb', '#7d0496', '#ffffff', '#aaaaaa', '#000000',
    ]

    let swatchDivs = []
    colors.forEach(color => {
      swatchDivs.push(<div key={color} className='ColorPicker__swatch'
        style={{backgroundColor: color}}></div>)
    })

    let pickerDivs = (
      <div className='ColorPicker__picker-ctr'>
        <div className='ColorPicker__sat-ctr'>
          <Saturation
            {...this.props}
            pointer={SatCustomPointer}
            onChange={this.handleChange}  />
        </div>
        <div className='ColorPicker__hue-ctr'>
          <Hue
            {...this.props}
            pointer={HueCustomPointer}
            onChange={this.handleChange}
            direction={'horizontal'} />
        </div>
      </div>
    )

    let currentColors = [
      'black', 'white', 'turquoise'
    ]

    let currentColorDivs = []
    currentColors.forEach(color => {
      currentColorDivs.push(<div key={color} className='ColorPicker__current-swatch'
        style={{backgroundColor: color}}></div>)
    })

    let headerOrHex = <div className='ColorPicker__current-header'>
        current monster colors
      </div>
    if (this.state.showPicker) {
      headerOrHex = <div className='ColorPicker__hex-ctr'>
          #888888
        </div>
    }

    let activeShadow = {boxShadow: '1.5px 1.5px 0px 0px #000'}

    return (
      <div className='ColorPicker__ctr'>
        <div className='ColorPicker__switch-ctr'>
          <div className='ColorPicker__swatches-btn'
            onClick={this.handleSwatchesBtnClick}
            style={this.state.showSwatches ? activeShadow : null}>
            <i className="material-icons">view_module</i>
          </div>
          <div className='ColorPicker__picker-btn'
            onClick={this.handlePickerBtnClick}
            style={this.state.showPicker ? activeShadow : null}>
            <i className="material-icons">colorize</i>
          </div>
        </div>
          {this.state.showSwatches ? swatchDivs : pickerDivs}
          {headerOrHex}
          {/* colors or picked color? */}
          <div className='ColorPicker__current-swatches-ctr'>
            {currentColorDivs}
          </div>
      </div>
    )
  }
}

export default CustomPicker(ColorPicker)
