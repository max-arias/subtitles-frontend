import React from 'react';
import { useRouter } from 'next/router';
import { minutesToHours } from '../../utils/dates';

import IndeterminateLoader from '../../components/Loader/Indeterminate';
import SubsTable from '../../components/SubsTable';

const Subs = ({ mediaData, subtitles }) => {
  const router = useRouter();
  const loading = router.isFallback;

  return (
    <div className="w-full h-screen font-sans bg-gray-100">
      {loading ? (
        <div className="w-full flex justify-center">
          <IndeterminateLoader />
        </div>
      ) : (
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
            <div>
              {/* <IndeterminateLoader type="circle" text="OS" />
                <IndeterminateLoader type="circle" text="YTS" /> */}
              <SubsTable data={subtitles} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticPaths() {
  const API_URL = process.env.API_URL || '/';

  const data = await fetch(`${API_URL}/media-items`);
  const mediaItems = await data.json();

  // Get the paths we want to pre-render based on suggestions
  const paths = mediaItems.map(mediaItem => ({
    params: { imdbId: mediaItem.imdbId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(ctx) {
  const { imdbId } = ctx.params;
  let mediaData = null;

  // Fetch media data (images, description, etc) based on the imdbId
  const API_URL = process.env.API_URL || '/';

  // Fetch media data for this page (poster, text, etc)
  const data = await fetch(`${API_URL}/media-items?imdbId=${imdbId}`);
  mediaData = await data.json().then(res => (res ? res[0] : null));

  // TODO: Move to constant
  const providers = ['opensubtitles', 'yts']
    .map(item => `provider=${item}`)
    .join('&');

  const subtitles = await fetch(
    `${API_URL}/subtitles?imdbId=${imdbId}&${providers}`
  ).then(res => res.json());

  return { props: { mediaData, subtitles }, revalidate: 1 };
}

export default Subs;

// "backdrop_sizes": [
//   "w300",
//   "w780",
//   "w1280",
//   "original"
// ],
// "logo_sizes": [
//   "w45",
//   "w92",
//   "w154",
//   "w185",
//   "w300",
//   "w500",
//   "original"
// ],
// "poster_sizes": [
//   "w92",
//   "w154",
//   "w185",
//   "w342",
//   "w500",
//   "w780",
//   "original"
// ],
// "profile_sizes": [
//   "w45",
//   "w185",
//   "h632",
//   "original"
// ],
// "still_sizes": [
//   "w92",
//   "w185",
//   "w300",
//   "original"
// ]
