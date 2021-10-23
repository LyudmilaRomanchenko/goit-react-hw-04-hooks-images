import "./App.css";
import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import API from "./services/img-api";
import Button from "./components/Button";
import Spinner from "./components/Spinner";

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  console.log(error);

  // Сброс страницы в 1
  const resetPage = () => {
    setPage(1);
    setData([]);
    setShowModal(false);
    setStatus("idle");
  };

  // Запрос пользователя по поиску
  const handleFormSubmit = (query) => {
    // console.log(query);
    resetPage();
    setQuery(query);
  };

  // Кнопка показать еще
  const handleButtonLoadMore = () => {
    console.log("Кнопка показать болше");
    // console.log(this.state.page);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

    setPage((page) => page + 1);
  };

  // По клику на картинку открывается модалка с большим изображением
  const handleClickImg = (e) => {
    // console.log(this.state.largeImg);
    const imgForModal = e.currentTarget.alt;
    console.log(imgForModal);
    setShowModal(true);
    setLargeImg(imgForModal);
    // console.log(e.currentTarget.alt);
    console.log(largeImg);
    console.log("Modal");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    console.log(query);

    setStatus("pending");

    API.fetchApi(query, page)
      .then(({ hits }) => {
        setData([
          ...data,
          ...hits.map(({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })),
        ]);
      })
      .catch((error) => setError(error))
      .finally(() => setStatus("resolved"));
  }, [query, page]);

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />

      {status === "idle" && <h2>Enter your request.</h2>}

      {data.length > 0 && (
        <ImageGallery data={data} handleClickImg={handleClickImg} />
      )}

      {data.length >= 12 && status === "resolved" && (
        <Button handleButtonLoadMore={handleButtonLoadMore} />
      )}

      {showModal && <Modal largeImg={largeImg} onClick={toggleModal} />}

      {status === "pending" && <Spinner />}
    </div>
  );
}

export default App;
