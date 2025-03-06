---
layout: default
title: 标签索引
---

<h1>标签目录</h1>

{% assign all_tags = site.data.notes | map: 'tags' | join: ',' | split: ',' | uniq %}
{% for tag in all_tags %}
<section class="tag-section" style="margin-bottom: 2rem;">
  <h2 id="{{ tag | slugify }}">#{{ tag }}</h2>
  <div class="tag-scroll-container">
    {% assign sorted_notes = site.data.notes | where: 'tags', tag | sort: 'date' | reverse %}
    {% for note in sorted_notes %}
      <div class="note-card" data-index="{{ forloop.index0 }}">
        <div class="note-date">{{ note.date | date: "%Y-%m-%d" }}</div>
        <div class="note-excerpt">{{ note.content | markdownify | strip_html | truncate: 80 }}</div>
      </div>
    {% endfor %}
  </div>
</section>
{% endfor %}

<script src="/js/scroll.js"></script>