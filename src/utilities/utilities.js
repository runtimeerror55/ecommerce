export const getToken = () => {
      return JSON.parse(localStorage.getItem("token"));
};

export const toastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
};

export const barsOptions = {
      height: "30",
      width: "60",
      color: "#4fa94d",
      ariaLabel: "bars-loading",
      visible: true,
};

export const colorRingOptions = {
      visible: true,
      height: "60",
      width: "60",
      ariaLabel: "blocks-loading",
      wrapperClass: "blocks-wrapper",
      colors: ["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"],
};

export const defaultFilterValues = {
      brand: "all",
      price: "4000",
      sort: "1",
      cpuBrand: "all",
      category: "all",
      page: "0",
};
