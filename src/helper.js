module.exports = {
  filter_nodelist: (nodelist_obj,fn)=>{
    //   this piece of hacky code is from stakc overflow!
    // https://stackoverflow.com/a/49849821/16309718

    // example 
    // filter_nodelist(document.querySelectorAll('input[name="exampleRadios"]'),(x)=> x.checked === true)
    return Array.prototype.filter.call(nodelist_obj, fn)
  },
  getbyid:(id)=>{
    return document.getElementById(id)
  },
  string_to_regexp :(input)=>{
    //   Converting user input string to regular expression
    //   source https://stackoverflow.com/a/874742/16309718
    var flags = input.replace(/.*\/([gimy]*)$/, '$1');
      var pattern = input.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
      var regex = new RegExp(pattern, flags);
      return regex
  },
   pasteRegexPattern:(editor,text)=>{
    var selection = editor.getSelection();
    var id = { major: 1, minor: 1 };             
    var op = {identifier: id, range: selection, text: text, forceMoveMarkers: true};
    editor.executeEdits("my-source", [op]);
  },
  addButtonHandler:(id_name,fn)=>{
// example
// h.addButtonHandler("newline-radio-buttons",eventSetNewlineOption)

    var el_id = document.getElementById(id_name)
    el_id.addEventListener("click",fn,false)
    
  },
  getRadioBtnSelectionValue: (id)=>{
    let radio_buttons = document.querySelectorAll(`input[name="${id}"]`)

    let results = Array.prototype.filter.call(radio_buttons,(x)=> x.checked === true)
  
    // set "filter by input field to append current radio selection"
    return results[0].value
  },
  selectionReplace:(editor,text)=>{
    var selection = editor.getSelection()
    var id = { major: 1, minor: 1 };             
    var op = {identifier: id, range: selection, text: text, forceMoveMarkers: true};
    editor.executeEdits("my-source", [op]);
  },
  multiSelectionReplace:(editor,text)=>{
    var selections = editor.getSelections()
    var id = { major: 1, minor: 1 };             
    var ops = selections.map(x=>{ return {identifier: id, range: x, text: text, forceMoveMarkers: true} })
    editor.executeEdits("my-source", ops);
  },
  multiSelectionReplaceFn:(editor,fn)=>{
    //   example
    // h.multiSelectionReplaceFn(editor, ()=>new RandExp(/([a-b]){5}/g ).gen())

    var selections = editor.getSelections()
    var id = { major: 1, minor: 1 };             
    var ops = selections.map(x=>{ return {identifier: id, range: x, text: fn(), forceMoveMarkers: true} })
    editor.executeEdits("my-source", ops);
  }
}