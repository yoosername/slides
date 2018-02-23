var wto;

export const debounce = function(callback){

  clearTimeout(wto);
  wto = setTimeout(function() {
    callback();
  }, 1000);

}
