import { connect } from "react-redux";
import Whatsapp from "../Whatsapp";
import {
  getGifImages,
  unsplashImage,
  pixabayImages,
} from "../actions/externalMedia";

const mapStateToProps = (state) => ({
  userDetails: state.userDetails,
  externalMediaData: state.externalMedia,
});

const mapDispatchToProps = (dispatch) => ({
  getGifImages: (page, query, category) => {
    dispatch(getGifImages(page, query, category));
  },
  unsplashImage: (page, query, category) => {
    dispatch(unsplashImage(page, query, category));
  },
  pixabayImages: (page, query, category) => {
    dispatch(pixabayImages(page, query, category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Whatsapp);
