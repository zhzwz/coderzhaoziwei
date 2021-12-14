import { React } from "https://deno.land/x/pagic@v1.3.1/mod.ts"

export default {
  srcDir: ".",
  outDir: "dist",
  // include: [],
  exclude: [],
  root: "/",
  theme: "blog",
  plugins: [ "blog" ],
  blog: {
    root: "/",
    social: {
      github: "coderzhaoziwei/blog",
      email: "coderzhaoziwei@outlook.com",
      twitter: "coderzhaoziwei",
    },
  },
  nav: [
    {
      text: '首页',
      link: '/',
      icon: 'czs-home-l'
    },
    {
      text: '分类',
      link: '/categories/',
      icon: 'czs-category-l'
    },
    {
      text: '标签',
      link: '/tags/',
      icon: 'czs-tag-l'
    },
    {
      text: '关于',
      link: '/about/',
      icon: 'czs-about-l'
    },
    {
      text: '归档',
      link: '/archives/',
      icon: 'czs-box-l'
    },
    {
      text: '友情链接',
      link: '/links/',
      icon: 'czs-link-l'
    }
  ],

  title: "码字",
  description: "欢迎来到我的博客，这里搜集了我的技术文章和生活感悟，欢迎一起交流成长。",

  head: <link rel="icon" type="image/svg+xml" href="https://github.githubassets.com/favicons/favicon.svg" />,

  github: "https://coderzhaoziwei.github.io",

  md: {
    tocEnabled: true,
  },
  tools: {
    backToTop: true,
  },

}
