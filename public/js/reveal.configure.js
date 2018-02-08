// Add the HTML section fragment for Markdown support
function insertMarkdownFragment(markdown) {
  console.log("[Viewer] inserting markdown fragment");
  if(!markdown){
    console.log("[Viewer] markdown not specified, loading default");
    $.get('/default.md', function(res){
      var fragment = RevealMarkdown.slidify(res,{
        separator: '^\r?\n---\r?\n$',
        verticalSeparator: '^\r?\n--\r?\n$',
        notesSeparator: 'notes?:'
      });
      $('.slides').html(fragment);
      //console.log($('.slides').html());
    })
  }else{
    console.log("[Viewer] processing markdown");
    var fragment = RevealMarkdown.slidify(markdown,{
      separator: '^\r?\n---\r?\n$',
      verticalSeparator: '^\r?\n--\r?\n$',
      notesSeparator: 'notes?:'
    });
    $('.slides').html(fragment);
    //console.log($('.slides').html());
  }

}

// Add the HTML section fragment for Markdown support
// See Reveal.getIndices()
function scrollToCurrentSlide() {
  console.log("[Viewer] scrolling to current slide");
  var i = Reveal.getIndices();
  if(i && (i.h && i.v && i.f)) Reveal.slide(i.h, i.v, i.f);
  else Reveal.slide(0,0,0);
}

function loadMarkdown(args) {
  console.log("[Viewer] insertMarkdownFragment: ", args);
  insertMarkdownFragment(args.markdown);
  console.log("[Viewer] initializing RevealMarkdown");
  RevealMarkdown.initialize();
}

// Update the fragment, initialize and go (back) to current slide
// RevealMarkdown refers to:
//      https://github.com/hakimel/reveal.js/blob/master/plugin/markdown/markdown.js
function reloadMarkdown(args) {
  loadMarkdown(args);
  scrollToCurrentSlide();
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// Setup reveal the first time
console.log("[Viewer] initializing Reveal.js (embedded="+inIframe()+")");
Reveal.initialize({
  embedded : (inIframe() ? true : false),
  parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
  parallaxBackgroundSize: '2100px 900px',
  //parallaxBackgroundImage: "https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg",
  dependencies: [
    { src: 'plugin/markdown/marked.js' },
    { src: 'plugin/markdown/markdown.js' },
    { src: 'plugin/notes/notes.js', async: true },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() {
      hljs.initHighlightingOnLoad();
      firstLoad();
    } }
  ]
});

// Add fragment once initially
// Notify that the iframe is ready
function firstLoad(){
    console.log("[Viewer] Attempt to load markdown from cache");
    var cached = localStorage.getItem("markdown");
    if(cached) reloadMarkdown({markdown:cached});
    else reloadMarkdown();
}

// Custom Reveal RPC handler
// See: [989] : Reveal.setupPostMessage()
Reveal.reloadMarkdown = reloadMarkdown;
