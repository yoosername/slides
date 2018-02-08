// Add the HTML section fragment for Markdown support
function insertMarkdownFragment(markdown) {

  return new Promise(function(resolve, reject) {

    console.log("[Viewer] inserting markdown fragment");
    if(!markdown){
      console.log("[Viewer] markdown not specified, loading default");
      $.get('/default.md', function(md){
        console.log("[Viewer] default markdown loaded");

        var fragment = RevealMarkdown.slidify(md,{
          separator: '^\r?\n---\r?\n$',
          verticalSeparator: '^\r?\n--\r?\n$',
          notesSeparator: 'notes?:'
        });
        //console.log("[Viewer] fragment:",fragment);
        $('.slides').html(fragment);
        resolve(fragment);
      })
    }else{
      console.log("[Viewer] processing markdown");
      var fragment = RevealMarkdown.slidify(markdown,{
        separator: '^\r?\n---\r?\n$',
        verticalSeparator: '^\r?\n--\r?\n$',
        notesSeparator: 'notes?:'
      });
      $('.slides').html(fragment);
      resolve(fragment);
    }

  });

}

function getSavedSlide(){
  var slide = localStorage.getItem("reveal.slide");
  try{
    slide = JSON.parse(slide);
  }catch(e){}
  return slide;
}

function saveCurrentSlideToLocalStorage(slide){
  localStorage.setItem("reveal.slide", JSON.stringify(slide));
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
  return localStorage.getItem("reveal.markdown");
}

function initializeRevealMarkdown() {
  console.log("[Viewer] initializing RevealMarkdown");
  RevealMarkdown.initialize();
}

function gotoEditMode(){
  console.log("[Viewer] going to edit mode");
  window.location.href='/';
}

function setupHotkeys(){
  console.log("[Viewer] initializing hotkeys");
  var listener = new window.keypress.Listener();
  listener.simple_combo("e", function() {
    console.log("[Viewer] user pressed 'e' hotkey, switching to edit mode");
    gotoEditMode();
  });
}

function setupEditButton(){
  console.log("[Viewer] initializing edit button");
  $("#editButton").show();
  $("#editButton button").on("click",gotoEditMode);
}

// Update the fragment, initialize and go (back) to current slide
// RevealMarkdown refers to:
//      https://github.com/hakimel/reveal.js/blob/master/plugin/markdown/markdown.js
function loadMarkdown(markdown) {
  insertMarkdownFragment(markdown).then(function(){
    initializeRevealMarkdown();
  });
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
      scrollToSavedSlide();
    } }
  ]
});

Reveal.addEventListener( 'ready', function( event ) {
  console.log("[Viewer] Reveal Initialized and ready");
  reloadMarkdown();
  if(!inIframe()){
    setupEditButton();
    setupHotkeys();
  }
} );

Reveal.addEventListener( 'slidechanged', function( event ) {
  console.log("[Viewer] slide changed saving slide as: ", event.indexh, ":", event.indexv);
  saveCurrentSlideToLocalStorage({"h":event.indexh, "v":event.indexv});
} );

// Custom Reveal RPC handler
// See: [989] : Reveal.setupPostMessage()
Reveal.reloadMarkdown = reloadMarkdown;
