import React, { Component, Fragment } from 'react'

import '../styles/ColorPicker.css'

import ColorPickerCustom from './ColorPickerCustom.js'

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

    let currentHeader = <div className='ColorPicker__current-header'>
        current monster colors
      </div>

    let currentColors = [
      'black', 'white', 'turquoise'
    ]

    let currentColorDivs = []
    currentColors.forEach(color => {
      currentColorDivs.push(<div key={color} className='ColorPicker__current-swatch'
        style={{backgroundColor: color}}></div>)
    })

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
          {this.state.showSwatches ? swatchDivs : <ColorPickerCustom color={this.props.color}/>}
          {this.state.showSwatches ? currentHeader : null }
          <div className='ColorPicker__current-swatches-ctr'>
            {currentColorDivs}
          </div>
      </div>
    )
  }
}

export default ColorPicker
