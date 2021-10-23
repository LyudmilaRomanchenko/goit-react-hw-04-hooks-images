import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState("");

  // Контролируем изминения запроса в инпуте и делаем нечуствительным к регистру (приводим к нижнему регистру)
  const handleChange = (e) => {
    setSearch(e.currentTarget.value.toLowerCase());
    // this.setState({
    //   search: e.currentTarget.value.toLowerCase(),
    // });
  };

  // Сабмит формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Если пустая строка запрос не передаем
    if (search.trim() === "") {
      console.log("Пустая строка");
      return;
    }

    // Передаем результат запроса в App.js
    onSubmit(search);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          name="search"
          value={search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.prototype = {
  onSubmit: PropTypes.func.isRequired,
};
