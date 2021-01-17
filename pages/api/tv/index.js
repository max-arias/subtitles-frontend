export default async (req, res) => {
  const url = new URL(`${process.env.API_URL}/media-items`);
  url.search = new URLSearchParams(req.query).toString();

  try {
    let result = await fetch(url).then(data => data.json());

    if (!result.length) {
      return res.json(null);
    }

    if (result.length > 1) {
      return res.json(result);
    }

    res.json(result[0].data);
  } catch (error) {
    res.json(error);
  }
};
