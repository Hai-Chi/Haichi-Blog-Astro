---
layout: "@layouts/BlogLayout.astro"
title: Astro入门
pubDate: 2025-01-07
category: Astro
tags: [Astro]
description: Astro入门
cover: '@assets/blog/profile.png'
draft: true
---

# 1.基本
在`src/pages/`下创建的文件（.astro或.md文件），在访问时路径为`/`。

# 2.模板语法
在 frontmatter 中的代码栅栏之间编写js代码创建变量\
在HTML中可以用`{}`来访问这些变量\
更多：https://docs.astro.build/zh-cn/reference/astro-syntax/

# 3.条件渲染
```astro
// 类似于JSX表达式
{happy && <p>我非常乐意学习 Astro！</p>}

{finished && <p>我完成了这节教程！</p>}

{goal === 3 ? <p>我的目标是在三天内完成。</p> : <p>我的目标不是 3 天。</p>}
```

# 4.CSS变量
在 frontmatter 中的代码栅栏之间编写js代码创建变量\
在style标签中定义变量\
在css代码中使用变量
```css
<style define:vars={{skillColor}}>
  h1 {
    color: purple;
    font-size: 4rem;
  }
  .skill {
    color: green;
    color: var(--skillColor);
    font-weight: bold;
  }
</style>
```

# 5.引入外部css代码
```js
import 'xxx.css'
```

# 6.组件传参
在组件中定义需要的参数\
```astro
---
const { platform, username } = Astro.props;
---
<a href={`https://www.${platform}.com/${username}`}>{platform}</a>
```
使用组件时传参
```astro
<Social platform="twitter" username="astrodotbuild" />
```

# 7.浏览器js脚本
* 将 JavaScript 直接写在每个页面上：使用 `<script>`标签
* 也可以将你的 `<script>` 标签的内容移动到项目中自己的 .js 文件中，然后在`<script>`标签中使用`import 'xxx.js'`语句

# 8.布局 (Layout)
## 插槽
在组件里添加一个 `<slot />` 元素，这允许你将写在开放和闭合 <Component></Component> 标签之间的子内容注入（或者说是「插入」）到任何 Component.astro 文件中。

## 在布局文件中使用md中 frontmatter YAML 的值
在`.md`文件中添加以下 frontmatter 属性以应用布局
```yaml
layout: ../../layouts/MarkdownPostLayout.astro
```
在布局文件中读取 frontmatter 属性
```astro
---
const { frontmatter } = Astro.props;
---
<h1>{frontmatter.title}</h1>
<p>Written by {frontmatter.author}</p>
<slot />
```

# 9.astro api
## 获取所有文章
```astro
---
const allPosts = await Astro.glob('./posts/*.md');
---
<!-- 渲染文章列表 -->
{allPosts.map((post) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
```

## 动态创建页面
使用 .astro 文件创建整套动态页面，需要向外暴露一个 getStaticPaths() 函数。
* 首先需要创建一个文件名中含有方括号的.astro文件, 例如：`[tag].astro`
* 然后在该文件中创建 getStaticPaths() 函数
```astro
---
export async function getStaticPaths() {
  const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));

  return [
    {params: {tag: "astro"}, props: {posts: allPosts}},
    {params: {tag: "successes"}, props: {posts: allPosts}},
    {params: {tag: "community"}, props: {posts: allPosts}},
    {params: {tag: "blogging"}, props: {posts: allPosts}},
    {params: {tag: "setbacks"}, props: {posts: allPosts}},
    {params: {tag: "learning in public"}, props: {posts: allPosts}}
  ];
}
---
```
* 提取路径参数
```astro
---
// 获取URL中[tag]内部的值
const { tag } = Astro.params;
---
* 获取props
```astro
const { posts } = Astro.props;
```


# 10.参考
[FrontMatter中的YAML](https://dev.to/paulasantamaria/introduction-to-yaml-125f)