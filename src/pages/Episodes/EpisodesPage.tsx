/* eslint-disable camelcase */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Episode } from '../Modals/EpisodesModal';
import styles from './EpisodesPage.module.scss';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [search, setSearch] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMesagge, setErrorMessage] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getEpisodes = async () => {
    setLoading(true);
    const charName = `?name=${inputValue}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${charName}`);
      setEpisodes(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'The information you requested was not found!' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not axios error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEpisodes();
  }, [search]);

  return (
    <div>
      <div className="row center-xs">
        <div className="col-xs-12">
          <div className={styles.text__box}>
            <span>e</span>
            <span>p</span>
            <span>i</span>
            <span>s</span>
            <span>o</span>
            <span>d</span>
            <span>e</span>
            <span>s</span>
          </div>
        </div>
      </div>
      <div className="row center-xs middle-xs">
        <div className="col-xs-12">
          <form
            className={styles.form__container}
            action="submit"
            onSubmit={(e) => {
              e.preventDefault();
              setInputValue('');
              getEpisodes();
            }}
          >
            <input
              className={styles.search__input}
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="How can I help You?"
            />
            <button
              className="button"
              type="button"
              onClick={() => { getEpisodes(); setInputValue(''); setSearchParams({ name: inputValue }); }}
            >
              Search
            </button>
          </form>

          <button
            className="button"
            type="button"
            onClick={() => { getEpisodes(); setSearchParams({}); }}
          >
            All
          </button>
        </div>
      </div>

      {loading && <Loader />}
      {errorMesagge && <span className="error__message">{errorMesagge}</span>}

      <div className="row center-xs">
        <div className="col-xs-11 col-md-11">
          <div className={styles.episodes__container}>

            { episodes && episodes.map(({
              id, name, air_date, episode,
            }) => (
              <div
                className={styles.episodes__cards}
                key={id}
              >
                <h3>{name}</h3>
                <br />
                <span>{episode}</span>
                <br />
                <span>{air_date}</span>

                <button
                  className={styles.episodes__button}
                  onClick={() => navigate(`/episodes/${id}`)}
                >
                  Read more
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>

    </div>
  );
};

export default EpisodesPage;
