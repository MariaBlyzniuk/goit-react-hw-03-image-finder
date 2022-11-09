import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItemStyles } from './ImageGalleryItem.styled';
import { ImgStyle } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleImageClick = () => {
    this.props.onClick(this.props.largeImageURL, this.props.tags);
  };

  render() {
    const { id, webformatURL, tags } = this.props;

    return (
      <ImageGalleryItemStyles key={id}>
        <ImgStyle
          src={webformatURL}
          alt={tags}
          onClick={this.handleImageClick}
        />
      </ImageGalleryItemStyles>
    );
  }
}