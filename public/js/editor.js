var editor, wto;

$.get("/live.md",function(contents){
  console.log("[Editor] Loading markdown from /live.md");
  $("#editor").html(contents);
  setupSession();
});

function revealRpc(msg){
  $('#reveal')[0].contentWindow.postMessage(JSON.stringify(msg), window.location.origin);
}

function setupSession(){
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
      var cursorRow = editor.getCursorPosition().row;
      var currentSlide = getCurrentEditorSlide(cursorRow);
      revealRpc({
        method: 'slide',
        args: [currentSlide.h, currentSlide.v]
      });
  });
}

function saveAndReload() {

  console.log("[Editor] Saving Markdown");
  $.ajax({
      type: "POST",
      url: "/reload",
      data: JSON.stringify({"markdown" : editor.getSession().getValue()}),
      contentType: "application/json",
      dataType: "json"
  })
  .always(function(res){
    console.log("[Editor] Notifying Reveal.js frame to reload");
    revealRpc({
      method: 'reloadMarkdown'
    });
  })

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
