import React from 'react';
import PropTypes from 'prop-types';

import { ButtonLoadMore } from './Button.styled';

export default function Button ({ onLoadMore }){
  return (
    <ButtonLoadMore type="button" onClick={onLoadMore}>
      Load more
    </ButtonLoadMore>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};