import React, { Component } from 'react'

import '../styles/ColorPicker.css'

import ColorPickerCustom from './ColorPickerCustom.js'

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

  handleSwatchClick = (color) => {
    this.props.dispatchColor(color)
  }

  handleSatChange = (colorObj) => {
    this.props.dispatchColor(colorObj.hex)
  }

  handleCurrentSwatchClick = (color) => {
    this.props.dispatchColor(color)
  }

  render() {

    let colors = [
      '#80f0ff', '#2e7bed', '#034887', '#01ff70', '#32cd32', '#136b48',
      '#fffc00', '#ff9900', '#af5a03', '#f29090', '#fa3232', '#a20303',
      '#f892fa', '#d808eb', '#7d0496', '#ffffff', '#aaaaaa', '#000000',
    ]

    let swatchDivs = []
    colors.forEach(color => {
      if (this.props.color === color) {
        swatchDivs.push(
          <div key={color}
            className='ColorPicker__swatch'
            style={{backgroundColor: color, boxShadow: '1.5px 1.5px 0px 0px black'}}
            onClick={() => this.handleSwatchClick(color)}></div>)
      } else {
        swatchDivs.push(
          <div key={color}
            className='ColorPicker__swatch'
            style={{backgroundColor: color}}
            onClick={() => this.handleSwatchClick(color)}>
          </div>)
      }
    })

    let currentHeader = <div className='ColorPicker__current-header'>
        current monster colors
      </div>

    let currentColors = [
      '#000000', '#ffffff', '#ff0000'
    ]

    let currentColorDivs = []
    currentColors.forEach(color => {
      if (this.props.color === color) {
        currentColorDivs.push(
          <div key={color}
            className='ColorPicker__current-swatch'
            style={{backgroundColor: color, boxShadow: '1.5px 1.5px 0px 0px black'}}
            onClick={() => this.handleCurrentSwatchClick(color)}>
        </div>)
        } else {
          currentColorDivs.push(
            <div key={color}
              className='ColorPicker__current-swatch'
              style={{backgroundColor: color}}
              onClick={() => this.handleCurrentSwatchClick(color)}>
            </div>)
        }
    })

    let activeShadow = {boxShadow: '1.5px 1.5px 0px 0px black'}

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
          {this.state.showSwatches
            ? swatchDivs
            : <ColorPickerCustom
              color={this.props.color}
              onChange={this.handleSatChange}/>}
          {this.state.showSwatches ? currentHeader : null }
          <div className='ColorPicker__current-swatches-ctr'>
            {currentColorDivs}
          </div>
      </div>
    )
  }
}

export default ColorPicker
