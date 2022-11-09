import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { OverlayModal } from './Modal.styled';
import { ModalImg } from './Modal.styled';

export default class Modal extends Component {
  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    onCloseModal: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <OverlayModal onClick={this.handleCloseModal}>
        <ModalImg>
          <img src={src} alt={alt} />
        </ModalImg>
      </OverlayModal>
    );
  }
}