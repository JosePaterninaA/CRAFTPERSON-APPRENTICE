import './AutoComplete.css';

import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete';
import classNames from 'classnames';

function renderInput(props) {
  return <input {...props} className="input" />
}

function renderItem(item, isHighlighted) {
  return (
    <div key={item.label} className={classNames(['ac-item', {highlight: isHighlighted}])}>
      {item.label}
    </div>
  );
}

function renderMenu(items, value, style) {
  return <div className="ac-menu" children={items} />
}

export default class AutoComplete extends Component {
  state = {
    value: ''
  }

  onSelect = (value, item) => {
    this.setState({value});
    this.props.onSelect(item);
  }

  onChange = (event, value) => {
    this.setState({value});
    if (!value) {
      this.props.onSelect({value: '', label: ''});
    }
  }

  matchStateToTerm(state, value) {
    return (
      state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  render() {
    const { value } = this.state;
    const { source } = this.props;

    return (
      <div className="ac">
        <Autocomplete
          value={value}
          items={source}
          renderItem={renderItem}
          renderMenu={renderMenu}
          renderInput={renderInput}
          wrapperStyle={{}}
          getItemValue={item => item.label}
          shouldItemRender={this.matchStateToTerm}
          onSelect={this.onSelect}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
