import React from 'react';
import { useRouter, useState } from 'next/router';
import { minutesToHours } from '../../../utils/dates';

import IndeterminateLoader from '../../../components/Loader/Indeterminate';

const Subs = ({ mediaData }) => {
  const getEpisodes = id => {};

  return (
    <div className="w-full h-screen font-sans">
      <div className="grid gap-4 grid-cols-12 p-10">
        <div className="pb-0 col-start-1 col-end-12 lg:col-start-2 lg:col-end-4 bg-white-100 rounded flex-col">
          <img
            className="rounded"
            src={`http://image.tmdb.org/t/p/w185/${mediaData.data.poster_path}`}
            alt={mediaData.title}
          />
          <div>
            <h1 className="font-bold text-4xl mb-2">{mediaData.title}</h1>
            <p>{mediaData.data.genres.map(g => g.name).join(' | ')}</p>
            <p>{minutesToHours(mediaData.data.runtime)}</p>
            <p className="mt-2">{mediaData.data.overview}</p>
          </div>
        </div>
        <div className="col-start-1 col-end-12 lg:col-start-4 lg:col-end-12">
          <h2 className="text-2xl font-bold mb-2">Seasons</h2>
          <div className="grid grid-flow-row auto-rols-max shadow-lg p-4">
            {mediaData?.data?.seasons.map((s, index) => {
              const poster =
                s.poster_path === 'N/A'
                  ? 'https://via.placeholder.com/94x128?text=No+Image'
                  : s.poster_path;

              return (
                <div
                  className="w-full flex mb-4 cursor-pointer lg:h-32 last:mb-0"
                  onClick={getEpisodes(s.id)}
                >
                  <img
                    className="h-48 lg:h-32 w-auto flex-none bg-cover rounded-tl rounded-bl text-center overflow-hidden"
                    src={`https://image.tmdb.org/t/p/w500/${poster}`}
                    alt={s.name}
                  />
                  <div className="md:w-32 border-r border-b border-gray-400 border-t bg-white rounded rounded-tl-none rounded-bl-none p-2 flex flex-col  flex-grow">
                    <div className="text-gray-900 font-bold text-xl mb-1">
                      {s.name}
                    </div>
                    <p className="text-gray-700" style={{ lineClamp: 1 }}>
                      {s.overview}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
    },
  };
}

export default Subs;
