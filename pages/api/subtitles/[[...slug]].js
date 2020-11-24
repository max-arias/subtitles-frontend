export default async (req, res) => {
  const {
    query: {
      slug: [provider, imdbId],
    },
  } = req;

  const API_URL = process.env.API_URL || '/';

  const data = await fetch(
    `${API_URL}/subtitles?provider=${provider}&imdbId=${imdbId}`
  ).then(res => res.json());

  const result = result?.[0]?.data || null;

  res.json(result);
};
