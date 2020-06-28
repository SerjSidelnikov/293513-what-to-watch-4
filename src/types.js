import PropTypes from 'prop-types';

export const filmType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  voiceCount: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  commentIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired;
