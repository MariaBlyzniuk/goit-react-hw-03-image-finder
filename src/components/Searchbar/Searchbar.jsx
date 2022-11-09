import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { SearchbarStyles } from './Searchbar.styled';
import { SearchFormStyles } from './Searchbar.styled';
import { SearchButton } from './Searchbar.styled';
import { SearchInput } from './Searchbar.styled';
import {BsSearch} from "react-icons/bs"

export default class Seachbar extends Component {
  static propTypes = { onSubmit: PropTypes.func };

  state = {
    findValue: '',
  };

  handleInputChange = event => {
    this.setState({ findValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.findValue.trim() === '') {
      toast.error('Type something to find');
      return;
    }

    this.props.onSubmit(this.state.findValue);
    this.setState({ findValue: '' });
  };

  render() {
    return (
      <SearchbarStyles>
        <SearchFormStyles onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <BsSearch/>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.findValue}
            onChange={this.handleInputChange}
          />
        </SearchFormStyles>
      </SearchbarStyles>
    );
  }
}