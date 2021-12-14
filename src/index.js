import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import * as monaco from 'monaco-editor'
import file_example from "./file_example"
import h from "./helper"
import RandExp from "randexp";

// globals
var current_regex = new RegExp("")
// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired
// console.log(file_example)

var editor = monaco.editor.create(document.getElementById('container'), {
  value: file_example.example_text,
  language: 'javascript',
  theme: 'vs-dark',
  // wordWrap: 'wordWrapColumn',
  // wordWrapColumn: 120,

  // Set this to false to not auto word wrap minified files
  wordWrapMinified: true,

  // try "same", "indent" or "none"
  wrappingIndent: "none"
});
// editor.setValue("ji")

var replace_fn = () => {
  console.log("replace_fn()")
  const fullRange = editor.getModel().getFullModelRange();
  let target_delim = h.getbyid("file-delim").value
  let delim_replace = h.getbyid("file-delim-replace").value
  let radioSelection = h.getRadioBtnSelectionValue("exampleRadios")//   
  

  let replace_delimiter = ""
  replace_delimiter = target_delim

  if (!(radioSelection === "")) {
    replace_delimiter = h.string_to_regexp(target_delim)
  }
 

  console.log(replace_delimiter,delim_replace,radioSelection)
  let current_text = editor.getValue()

  editor.executeEdits(null, [{
    text: current_text.replaceAll(replace_delimiter, delim_replace),
    range: fullRange
  }]);

}
var eventSetNewlineOption = (e) => {
  // set "filter by input field to append current radio selection"
  
  let radioSelection = h.getRadioBtnSelectionValue("exampleRadios")
  h.getbyid("file-delim-replace").value =''
  if (radioSelection === "") {
  return
  }
  
  if(radioSelection === "/\\t/g"){
    h.getbyid("file-delim-replace").value ='","'
  }

  if(radioSelection === "ENDING"){
    radioSelection = "/\\n/g"
    h.getbyid("file-delim-replace").value ='"\n"'
  }

  h.getbyid("file-delim").value = radioSelection
}
var eventSetRegexExampleButtons = (e) => {
  h.getbyid("pattern").value = h.getRadioBtnSelectionValue("regexExamples")
}
var generateRegexPattern = () => {
  let regex_string = h.getbyid("pattern").value

  regex_string = h.string_to_regexp(regex_string)
  current_regex = regex_string
  const randexp = new RandExp(regex_string);

  let result = randexp.gen()
  console.log(regex_string)
  console.log(result);
  h.getbyid("pattern-output").value = result

  // h.pasteRegexPattern(editor,result)

}
var pastePattern = () => {
  generateRegexPattern()
  h.multiSelectionReplaceFn(editor, () => new RandExp(current_regex).gen())
}


var myBinding = editor.addCommand(monaco.KeyCode.F9, function () {
  alert('F9 pressed!');
  // var selection = editor.getSelection()
  // var selections = editor.getSelections()
  // console.log(selection)
  // console.log(selections)
  // var id = { major: 1, minor: 1 };             
  // var text = "XXX";
  // // var op = {identifier: id, range: selection, text: text, forceMoveMarkers: true};
  // // editor.executeEdits("my-source", [op]);
  // var  ops = selections.map(x=>{ return {identifier: id, range: x, text: text, forceMoveMarkers: true} })
  // // var ops = [
  // //   {identifier: id, range: selections[0], text: text, forceMoveMarkers: true},
  // //   {identifier: id, range: selections[1], text: text, forceMoveMarkers: true},
  // //   {identifier: id, range: selections[2], text: text, forceMoveMarkers: true},

  // // ]
  // editor.executeEdits("my-source", ops);

  // console.log(current_regex)
  // console.log(h.getRadioBtnSelection("regexExamples"))
  
  let matchs =editor.getModel().findMatches('m', true, true, false, null, true, 1)
  var decorations = editor.deltaDecorations(editor.getModel().getAllDecorations(), [
    { range: matchs[0].range, options: { isWholeLine: true, linesDecorationsClassName: 'myLineDecoration' }},
  ]);
 editor.ISingleEditOperation({range:{startLineNumber: 3, startColumn: 15, endLineNumber: 3, endColumn: 16},text:"works  "})
  console.log( matchs)
  console.log( { range: matchs[0].range, options: { isWholeLine: true, linesDecorationsClassName: 'myLineDecoration' }})
    // replace_fn()
});




// main part of code
h.addButtonHandler("replace-button", replace_fn)
h.addButtonHandler("newline-radio-buttons", eventSetNewlineOption)
h.addButtonHandler("pattern-btn", generateRegexPattern)
h.addButtonHandler("pattern-paste-btn", pastePattern)
h.addButtonHandler("regex-examples-buttons", eventSetRegexExampleButtons)
h.addButtonHandler("replace-all-newlilnes-button", () => {
  let current_text = editor.getValue()
  const fullRange = editor.getModel().getFullModelRange();

  console.log(current_text)
  current_text = current_text.replaceAll(/\n/g, "")

  console.log(current_text)
  editor.executeEdits(null, [{
    text: current_text,
    range: fullRange
  }]);
})


