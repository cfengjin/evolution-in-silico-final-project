module.exports = {
  siteMetadata: {
    title: `Evolution in silico Final Project`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-transformer-remark", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "markdown",
      "path": "./src/markdown/"
    },
    __key: "markdown"
  }]
};