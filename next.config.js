const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'assets/svg'),
  webpack(config, options) {
    return config;
  },
  images: {
    domains: ['image.tmdb.org', 'm.media-amazon.com', 'via.placeholder.com'],
  },
});
