export default async (req, res) => {
  const {
    query: { keyword },
  } = req;

  const API_URL = process.env.API_URL || '/';
  const url = `${API_URL}/suggestions?keyword=${keyword}`;

  console.log('url', url);

  try {
    let result = await fetch(url).then(data => data.json());

    console.log('result', result);

    result = result && result[0] && result[0].data ? result[0].data : null;
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
