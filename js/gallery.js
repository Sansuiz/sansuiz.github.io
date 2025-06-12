fetch('/_data/gallery.yml')
  .then(response => response.text())
  .then(text => {
    const gallery = jsyaml.load(text);
    // 渲染画廊HTML
  });