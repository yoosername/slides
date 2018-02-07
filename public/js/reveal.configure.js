// Add the HTML section fragment for Markdown support
function insertMarkdownFragment() {
  console.log("[Viewer] inserting markdown fragment");
  $('.slides').html($('<section/>', {
    'data-markdown': "/live.md",
    'data-separator': "^---",
    'data-separator-vertical': "^--",
    'data-separator-notes': "^Note:",
    'data-charset': "utf-8"
  }));
}

// Add the HTML section fragment for Markdown support
// See Reveal.getIndices()
function scrollToCurrentSlide() {
  console.log("[Viewer] scrolling to current slide");
  var i = Reveal.getIndices();
  Reveal.slide(i.h, i.v, i.f);
}

// Update the fragment, initialize and go (back) to current slide
// RevealMarkdown refers to:
//      https://github.com/hakimel/reveal.js/blob/master/plugin/markdown/markdown.js
function reloadMarkdown() {
  console.log("[Viewer] loading markdown");
  insertMarkdownFragment();
  RevealMarkdown.initialize();
  scrollToCurrentSlide();
}


// Add fragment once initially
insertMarkdownFragment();

// Setup reveal the first time
console.log("[Viewer] initializing Reveal.js");
Reveal.initialize({
  embedded : true,
  //parallaxBackgroundImage: "https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg",
  dependencies: [
    { src: 'plugin/markdown/marked.js' },
    { src: 'plugin/markdown/markdown.js' },
    { src: 'plugin/notes/notes.js', async: true },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() {
      hljs.initHighlightingOnLoad();
    } }
  ]
});

// Custom Reveal RPC handler
// See: [989] : Reveal.setupPostMessage()
Reveal.reloadMarkdown = reloadMarkdown;
