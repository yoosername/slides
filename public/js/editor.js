var editor, wto;

initializeEditor();

function initializeEditor(){
  var saved = localStorage.getItem("reveal.markdown");
  if( saved ){
    console.log("[Editor] Autosave detected, loading it");
    $("#editor").html(saved);
    setupACEEditorSession();
  }else{
    $.get("/default.md",function(contents){
      console.log("[Editor] No auto save - fetch from /default.md");
      $("#editor").html(contents);
      setupACEEditorSession();
    });
  }
}

function iframeReadyHandler(){
  reloadPreview();
}

function reloadPreview(){
  console.log("[Editor] Notifying Reveal.js frame to reload");
  revealRpc({
       method: 'reloadMarkdown'
  });
}

function setupNavButtons(){
  $("#previewButton").on("click", function(){
    gotoPreviewMode();
  });

  $("#saveButton").on("click", function(){
    save();
  });
}

function gotoPreviewMode(){
  window.location.href = '/preview';
}

function save(){
  window.alert("not implemented yet!!");
}

function revealRpc(msg){
  $('#reveal')[0].contentWindow.postMessage(JSON.stringify(msg), window.location.origin);
}

function getCurrentCursor(){
  return editor.getCursorPosition();
}

function getCurrentSlide(){
  var cursorRow = getCurrentCursor().row;
  var currentSlide = getCurrentEditorSlide(cursorRow);
  return currentSlide;
}

function setupACEEditorSession(){
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/dracula");
  editor.getSession().setMode("ace/mode/markdown");
  editor.getSession().on('change', function() {
    console.log("[Editor] change detected");
    clearTimeout(wto);
    wto = setTimeout(function() {
      console.log("[Editor] User idle for 1 second");
      saveAndReload();
    }, 1000);
  });

  editor.getSession().selection.on('changeCursor', function(e) {
    console.log("[Editor] cursor moved - notify slide to update");
    var currentSlide = getCurrentSlide();
    revealRpc({
      method: 'slide',
      args: [currentSlide.h, currentSlide.v]
    });
  });

  setupNavButtons();

}

function saveToLocalStorage(){
  console.log("[Editor] Saving Markdown, CurrentSlide and CursorPosition to localstorage");
  localStorage.setItem("reveal.markdown", editor.getSession().getValue());
  localStorage.setItem("reveal.slide", JSON.stringify(getCurrentSlide()));
  localStorage.setItem("cursor", JSON.stringify(getCurrentCursor()))
}

function saveAndReload() {
  saveToLocalStorage();
  reloadPreview();
}

// Work out where we are in the slides from the cursor position in the editor
function getCurrentEditorSlide(cursor) {
    var slide = 0, sub = 0, end = false;
    ace.edit("editor").getValue().split('\n').forEach(function(line,idx,arr){
      if(idx < cursor){
        if (line.substring(0,3) === '---') {
          slide++;
          sub = 0;
        } else if (line.substring(0,2) === '--') {
          sub++;
        }
      }
    });
    return {
      "h" : slide,
      "v" : sub
    };
}
