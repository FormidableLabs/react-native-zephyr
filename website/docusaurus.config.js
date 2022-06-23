// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/okaidia");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Native Zephyr",
  tagline: "React Native styling library",
  url: "https://formidable.com",
  baseUrl: "/open-source/react-native-zephyr/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Formidable",
  projectName: "react-native-zephyr", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/FormidableLabs/react-native-zephyr/tree/master/packages/website",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "React Native Zephyr",
        logo: {
          alt: "Formidable logo",
          src: "img/formidable-f.svg",
        },
        items: [
          // {
          //   type: "doc",
          //   docId: "overview",
          //   position: "left",
          //   label: "Documentation",
          // },
          // {
          //   type: "doc",
          //   docId: "quick-start",
          //   position: "left",
          //   label: "Quick Start",
          // },
          {
            href: "https://github.com/FormidableLabs/react-native-zephyr",
            className: "header-github-link",
            "aria-label": "GitHub Repository",
            position: "right",
          },
          {
            href: "https://formidable.com",
            className: "header-formidable-link",
            "aria-label": "Formidable Website",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        // links: [
        //   {
        //     title: "Docs",
        //     items: [
        //       {
        //         label: "Quick Start",
        //         to: "/quick-start",
        //       },
        //     ],
        //   },
        //   // {
        //   //   title: "Community",
        //   //   items: [
        //   //     {
        //   //       label: "Stack Overflow",
        //   //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
        //   //     },
        //   //     {
        //   //       label: "Discord",
        //   //       href: "https://discordapp.com/invite/docusaurus",
        //   //     },
        //   //     {
        //   //       label: "Twitter",
        //   //       href: "https://twitter.com/docusaurus",
        //   //     },
        //   //   ],
        //   // },
        //   {
        //     title: "More",
        //     items: [
        //       {
        //         label: "GitHub",
        //         href: "https://github.com/FormidableLabs/react-native-zephyr",
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} Formidable`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
