import React from 'react';
import { useRouter } from 'next/router';

import SubsPage from '../../components/SubsPage';

const Subs = ({ mediaData, subtitles }) => {
  const router = useRouter();
  const loading = router.isFallback;

  return (
    <SubsPage mediaData={mediaData} subtitles={subtitles} loading={loading} />
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
