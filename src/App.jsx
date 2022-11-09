import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import imagesAPI from './services/imagesAPI';
import Modal from './components/Modal/Modal';

import { Container } from 'App.styled';
import 'react-toastify/dist/ReactToastify.css';


export class App extends Component {
  state = {
    findValue: '',
    pageNumber: 1,
    images: [],
    status: 'idle',
    error: null,
    showModal: false,
    largeImageURL: '',
    imageAlt: '',
  };

  handleFormSubmit = findValue => {
    this.setState({
      findValue: findValue,
      pageNumber: 1,
      images: [],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevFindValue = prevState.findValue;
    const nextFindValue = this.state.findValue;

    if (prevFindValue !== nextFindValue) {
      this.setState({ status: 'pending' });

      this.getImages();
    }

    if (prevState.pageNumber !== this.state.pageNumber) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  getImages = () => {
    const { findValue, pageNumber } = this.state;

    imagesAPI
      .fetchImages(findValue, pageNumber)
      .then(res =>
        this.setState(({ images, pageNumber }) => ({
          images: [...images, ...res],
          status: 'resolved',
          pageNumber: pageNumber + 1,
        })),
      )

      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onLoadMore = () => {
    this.getImages();
  };

  onOpenModal = (url, alt) => {
    this.setState({ largeImageURL: url, imageAlt: alt });

    this.modalToggle();
  };

  modalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const {
      status,
      error,
      images,
      largeImageURL,
      imageAlt,
      showModal,
    } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          status={status}
          error={error}
          images={images}
          onClick={this.onOpenModal}
          onLoadMore={this.onLoadMore}
        />
        {showModal && (
          <Modal
            src={largeImageURL}
            alt={imageAlt}
            onCloseModal={this.modalToggle}
          />
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
