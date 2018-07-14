import React, { Component } from 'react'
import { connect } from 'react-redux'

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

  handlePickerChange = (colorObj) => {
    this.props.dispatchColor(colorObj.hex)
  }

  handleCurrentSwatchClick = (color) => {
    this.props.dispatchColor(color)
  }

  render() {
    const { monster } = this.props

    let colors = [
      '#80f0ff', '#2e7bed', '#034887', '#01ff70', '#32cd32', '#136b48',
      '#fffc00', '#ff9900', '#af5a03', '#f29090', '#fa3232', '#a20303',
      '#f892fa', '#d808eb', '#7d0496', '#ffffff', '#aaaaaa', '#000000',
    ]

    let checkColor = (color) => {
      if(color.length < 5) {
        color += color.slice(1);
      }
      return (color.replace('#','0x')) > (0xffffff/2) ? '#000' : '#fff';
    }

    let swatchDivs = []
    colors.forEach(color => {
      if (this.props.color === color) {
        swatchDivs.push(
          <div key={color}
            className='ColorPicker__swatch'
            style={{backgroundColor: color}}
            onClick={() => this.handleSwatchClick(color)}>
              <div className='ColorPicker__check'>
                <i className="material-icons" style={{color: checkColor(color)}}>
                  check
                </i>
              </div>
            </div>)
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

    let currentColors = []
    for (const feature in monster) {
      if (!currentColors.includes(monster[feature].fillColor)) {
        currentColors.push(monster[feature].fillColor)
      }
    }

    let currentColorDivs = []
    currentColors.forEach(color => {
      if (this.props.color === color) {
        currentColorDivs.push(
          <div key={color}
            className='ColorPicker__current-swatch'
            style={{backgroundColor: color}}
            onClick={() => this.handleCurrentSwatchClick(color)}>
              <div className='ColorPicker__check'>
                <i className="material-icons" style={{color: checkColor(color)}}>
                  check
                </i>
              </div>
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
              onChange={this.handlePickerChange}/>}
          {this.state.showSwatches ? currentHeader : null }
          <div className='ColorPicker__current-swatches-ctr'>
            {currentColorDivs}
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monster: state.monster
  }
}

export default connect(mapStateToProps)(ColorPicker)
