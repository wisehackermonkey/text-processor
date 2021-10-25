import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import * as monaco from 'monaco-editor'
import file_example from "./file_example"

// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired
// console.log(file_example)

var editor = monaco.editor.create(document.getElementById('container'), {
  value: file_example.example_text,
  language: 'javascript',
  theme: 'vs-dark',
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 40,

    // Set this to false to not auto word wrap minified files
    wordWrapMinified: true,

    // try "same", "indent" or "none"
    wrappingIndent: "indent"
});
// editor.setValue("ji")

var replace_fn = ()=>{
  console.log("replace_fn()")
  const fullRange = editor.getModel().getFullModelRange();
  let delim = document.getElementById("file-delim").value
  let replace_with = document.getElementById("file-delim-replace").value
  
  let current_text = editor.getValue()
  
    editor.executeEdits(null, [{
      text: current_text.replaceAll(delim,replace_with),
      range: fullRange
    }]);

}
var eventSetNewlineOption = (e)=>{
  // console.log(e)
  document.getElementById("file-delim").
  console.log(eventSetNewlineOption)
}
var myBinding = editor.addCommand(monaco.KeyCode.F9, function() {
	alert('F9 pressed!');
  replace_fn()
  });




// main part of code
var replaceEl = document.getElementById("replace-button")
replaceEl.addEventListener("click",replace_fn,false)

var radioEl = document.getElementById("newline-radio-buttons")
radioEl.addEventListener("click",eventSetNewlineOption,false)

