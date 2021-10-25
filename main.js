// let example_text = `function x() {
//   console.log("Hello world!");
// }` 
// require is provided by loader.min.js.
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' } });
require(["vs/editor/editor.main"], () => {
  var editor = monaco.editor.create(
    document.getElementById('container'), {
    value: example_text,
    language: 'javascript',
    theme: 'vs-dark',
    language: "javascript",

    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 40,

    // Set this to false to not auto word wrap minified files
    wordWrapMinified: true,

    // try "same", "indent" or "none"
    wrappingIndent: "indent"
  });

  
var myBinding = editor.addCommand(monaco.KeyCode.F9, function() {
	alert('F9 pressed!');
});
});

