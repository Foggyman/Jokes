import { DefinePlugin } from 'webpack';

export default {
  webpack(config) {
    /* SET ENV VARIABLES */
    config.plugins.push(
      new DefinePlugin({
        'process.env.API': JSON.stringify('CHUCK_NORRIS'),
      })
    );
  },
};
