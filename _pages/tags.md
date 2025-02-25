---
layout: default
title: 标签索引
---

<h1>标签目录</h1>

{% assign all_tags = site.data.notes | map: 'tags' | join: ',' | split: ',' | uniq %}
{% for tag in all_tags %}
<section class="tag-section" style="margin-bottom: 2rem;">
  <h2 id="{{ tag | slugify }}">#{{ tag }}</h2>
  <ul>
    {% for note in site.data.notes %}
      {% if note.tags contains tag %}
        <li style="margin-bottom: 0.5rem;">
          <a href="{{ site.baseurl }}/notes#t{{ note.date | date: "%Y%m%d%I%M" }}">
            {{ note.date | date: "%Y-%m-%d" }} — {{ note.content | markdownify | strip_html | truncate: 40 }}
          </a>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
</section>
{% endfor %}