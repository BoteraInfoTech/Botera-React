const assignOrderIndex = (existing = [], incoming = []) => {
  const startIndex = existing.length;
  return incoming.map((item, i) => ({
    ...item,
    __order: startIndex + i,
  }));
};

const sortByOrder = (arr = []) => {
  return [...arr].sort((a, b) => (a.__order ?? 0) - (b.__order ?? 0));
};
const initialState = {
  status: null,
  giphyData: {
    images: [],
    haveMore: false,
    page: 1,
  },

  unsplashData: {
    images: [],
    haveMore: false,
    page: 1,
  },

  pixabayData: {
    images: [],
    haveMore: false,
    page: 1,
  },

  errorResponse: null,
  errorMessage: "",
  isLoading: true,
};

const externalMedia = (store = initialState, action) => {
  const { type, payload, meta } = action;
  const page = meta?.page ?? 1;

  switch (type) {
    /* --------------------------------------------------- */
    case "GET_GIF_PENDING":
      return {
        ...store,
        isLoading: true,
        status: "pending",
        giphyData: {
          ...store.giphyData,
          images: page === 1 ? [] : store.giphyData.images,
          page: page === 1 ? 1 : store.giphyData.page,
        },
      };

    case "GET_UNSPLASH_IMAGES_PENDING":
      return {
        ...store,
        isLoading: true,
        status: "pending",
        unsplashData: {
          ...store.unsplashData,
          images: page === 1 ? [] : store.unsplashData.images,
          page: page === 1 ? 1 : store.unsplashData.page,
        },
      };

    case "GET_PIXABAY_IMAGES_PENDING":
      return {
        ...store,
        isLoading: true,
        status: "pending",
        pixabayData: {
          ...store.pixabayData,
          images: page === 1 ? [] : store.pixabayData.images,
          page: page === 1 ? 1 : store.pixabayData.page,
        },
      };

    /* --------------------------------------------------- */
    case "GET_GIF_FULFILLED": {
      const prevPage = store?.giphyData?.page;
      const prevImages = page === 1 ? [] : store?.giphyData?.images || [];

      const rawNewImages = payload?.response?.gifUrls || [];
      const newImages = assignOrderIndex(prevImages, rawNewImages);

      const combined =
        page === 1
          ? newImages
          : page > prevPage
          ? [...prevImages, ...newImages]
          : store?.giphyData?.images;

      return {
        ...store,
        isLoading: false,
        status: "success",
        giphyData: {
          images: sortByOrder(combined),
          haveMore: payload?.response?.haveMorePages || false,
          page,
        },
      };
    }

    case "GET_UNSPLASH_IMAGES_FULFILLED": {
      const prevPage = store?.unsplashData?.page;
      const prevImages = page === 1 ? [] : store?.unsplashData?.images || [];

      const rawNewImages = payload?.response?.imageUrls || [];
      const newImages = assignOrderIndex(prevImages, rawNewImages);

      const combined =
        page === 1
          ? newImages
          : page > prevPage
          ? [...prevImages, ...newImages]
          : store?.unsplashData?.images || [];

      return {
        ...store,
        isLoading: false,
        status: "success",
        unsplashData: {
          images: sortByOrder(combined),
          haveMore: payload?.response?.haveMorePages || false,
          page,
        },
      };
    }

    case "GET_PIXABAY_IMAGES_FULFILLED": {
      const prevPage = store?.pixabayData?.page;
      const prevImages = page === 1 ? [] : store?.pixabayData?.images || [];

      const rawNewImages = payload?.response?.imageUrls || [];
      const newImages = assignOrderIndex(prevImages, rawNewImages);

      const combined =
        page === 1
          ? newImages
          : page > prevPage
          ? [...prevImages, ...newImages]
          : store?.pixabayData?.images || [];

      return {
        ...store,
        isLoading: false,
        status: "success",
        pixabayData: {
          images: sortByOrder(combined),
          haveMore: payload?.response?.haveMorePages || false,
          page,
        },
      };
    }

    default:
      return store;
  }
};

export default externalMedia;
