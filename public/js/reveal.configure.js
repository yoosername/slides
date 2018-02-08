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

function getCurrentRevealSlideIndex(){
  return Reveal.getIndices();
}

function getSavedSlide(){
  var slide = localStorage.getItem("slide");
  try{
    slide = JSON.parse(slide);
  }catch(e){}
  return slide;
}

function saveToLocalStorage(){
  var slideIndex = JSON.stringify(getCurrentRevealSlideIndex());
  console.log("[Editor] Saving slide info to localstorage: ", slideIndex);
  localStorage.setItem("slide", slideIndex)
}

// Add the HTML section fragment for Markdown support
// See Reveal.getIndices()
function scrollToSavedSlide() {
  var i = getSavedSlide();
  var hor = (i && i.h) ? i.h : 0;
  var ver = (i && i.v) ? i.v : 0;

  console.log("[Viewer] scrolling to slide: ", hor, ":",ver);
  Reveal.slide(hor, ver, 0);
}

function getMarkdownFromLocalStorage() {
  console.log("[Viewer] attempting to load markdown from local storage");
  return localStorage.getItem("markdown");
}

function initializeRevealMarkdown() {
  console.log("[Viewer] initializing RevealMarkdown");
  RevealMarkdown.initialize();
}

// Update the fragment, initialize and go (back) to current slide
// RevealMarkdown refers to:
//      https://github.com/hakimel/reveal.js/blob/master/plugin/markdown/markdown.js
function loadMarkdown(markdown) {
  insertMarkdownFragment(markdown);
  initializeRevealMarkdown();
}

function reloadMarkdown() {
  var markdown = getMarkdownFromLocalStorage();
  loadMarkdown(markdown);
  scrollToSavedSlide();
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
  parallaxBackgroundImage: '/images/ghost-nebula.jpg',
  parallaxBackgroundSize: '2100px 900px',
  //parallaxBackgroundImage: "https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg",
  dependencies: [
    { src: 'plugin/markdown/marked.js' },
    { src: 'plugin/markdown/markdown.js' },
    { src: 'plugin/notes/notes.js', async: true },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() {
      hljs.initHighlightingOnLoad();
      reloadMarkdown();
      if(!inIframe()){
        $("#editButton button").on("click",function(){window.location.href='/'});
      }else{
        $("#editButton button").hide();
      }
    } }
  ]
});

// Custom Reveal RPC handler
// See: [989] : Reveal.setupPostMessage()
Reveal.reloadMarkdown = reloadMarkdown;
