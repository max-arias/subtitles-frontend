import React, { useState } from 'react';
import Image from 'next/image';
import { minutesToHours } from '../../../utils/dates';

import IndeterminateLoader from '../../../components/Loader/Indeterminate';

const Subs = ({ mediaData, imdbId }) => {
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  const fetchEpisodes = async (tvId, seasonNum) => {
    const url = new URL(`${location.origin}/api/tv`);
    url.search = new URLSearchParams({
      tvId,
      seasonNum,
      imdbId,
    }).toString();

    setLoading(true);

    const data = await fetch(url).then(res => res.json());

    setEpisodes(data);
    setLoading(false);
  };

  return (
    <div className="w-full h-screen font-sans">
      <div className="grid gap-4 grid-cols-12 p-10">
        <div className="pb-0 col-start-1 col-end-13 lg:col-start-2 lg:col-end-4 bg-white-100 rounded flex-col">
          <Image
            width="185"
            height="280"
            className="rounded"
            src={`http://image.tmdb.org/t/p/w185/${mediaData.data.poster_path}`}
            alt={mediaData.title}
          />
          <div>
            <h1 className="font-bold text-4xl mb-2">{mediaData.title}</h1>
            <p>{mediaData.data.genres.map(g => g.name).join(' | ')}</p>
            <p>{minutesToHours(mediaData.data.runtime)}</p>
            <p className="mt-2 pr-6">{mediaData.data.overview}</p>
          </div>
        </div>
        <div className="col-start-1 col-end-13 lg:col-start-4 lg:col-end-13">
          <h2 className="text-2xl font-bold mb-5">Seasons</h2>
          <div className="grid grid-flow-row auto-rols-max shadow-lg p-4 bg-white rounded">
            {mediaData?.data?.seasons.map((s, index) => {
              const poster =
                s.poster_path === 'N/A'
                  ? 'https://via.placeholder.com/94x128?text=No+Image'
                  : s.poster_path;

              return (
                <div
                  className="w-full flex mb-4 cursor-pointer lg:h-32 last:mb-0"
                  onClick={() =>
                    fetchEpisodes(mediaData.data.id, s.season_number)
                  }
                  key={s.id}
                >
                  <Image
                    width="85"
                    height="128"
                    className="h-48 lg:h-32 w-auto flex-none bg-cover rounded-tl rounded-bl text-center overflow-hidden"
                    src={`https://image.tmdb.org/t/p/w185/${poster}`}
                    alt={s.name}
                  />
                  <div className="md:w-32 border-r border-b border-gray-400 border-t bg-white rounded rounded-tl-none rounded-bl-none p-2 flex flex-col  flex-grow">
                    <div className="text-gray-900 font-bold text-xl mb-1">
                      Season {s.season_number} - {s.name}
                    </div>
                    <p className="text-gray-700" style={{ lineClamp: 1 }}>
                      {s.overview}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {loading ? (
            <div className="mt-8">
              <IndeterminateLoader />
            </div>
          ) : null}

          {episodes.length ? (
            <div className="grid grid-flow-row auto-rols-max shadow-lg p-4 bg-white rounded mt-8">
              <h2 className="text-2xl font-bold mb-8">Episodes</h2>

              {episodes.map((episode, index) => {
                // TODO: Make util
                // TODO: Make rendering these rows into a component
                const poster =
                  episode.data.still_path === 'N/A'
                    ? 'https://via.placeholder.com/94x128?text=No+Image'
                    : episode.data.still_path;

                return (
                  <div
                    className="w-full flex mb-4 cursor-pointer lg:h-32 last:mb-0"
                    onClick={() => alert('episode')}
                    key={episode.id}
                  >
                    <Image
                      width="185"
                      height="104"
                      className="h-48 lg:h-32 w-auto flex-none bg-cover rounded-tl rounded-bl text-center overflow-hidden"
                      src={`https://image.tmdb.org/t/p/w185/${poster}`}
                      alt={episode.title}
                    />
                    <div className="md:w-32 border-r border-b border-gray-400 border-t bg-white rounded rounded-tl-none rounded-bl-none p-2 flex flex-col  flex-grow">
                      <div className="text-gray-900 font-bold text-xl mb-1">
                        S{episode.seasonNum}E{episode.episodeNum} -{' '}
                        {episode.title}
                      </div>
                      <p className="text-gray-700" style={{ lineClamp: 1 }}>
                        {episode.data.overview}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { imdbId } = ctx.params;

  const API_URL = process.env.API_URL || '/';

  const data = await fetch(`${API_URL}/media-items?imdbId=${imdbId}`);
  const mediaData = await data.json().then(res => (res ? res[0] : null));

  return {
    props: {
      mediaData,
      imdbId,
    },
  };
}

export default Subs;
