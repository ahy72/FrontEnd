// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')

module.exports = {
  publicPath:
    process.env.VUE_APP_ENV === 'production' ? '/VirtualMachineStatus2/' : './', // DefinePlugin に含めたい
  pages: {
    index: {
      entry: 'src/main.ts',
      title: '他社ソフト動作確認環境 稼働状況',
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        VUE_APP_API_ENDPOINT: JSON.stringify(
          process.env.VUE_APP_ENV === 'production'
            ? 'http://systrialsvr/api/VirtualMachineStatus/'
            : 'https://virtualmachinestatusbackend.azurewebsites.net/VirtualMachineStatus/'
        ),
      }),
    ],
  },
}
