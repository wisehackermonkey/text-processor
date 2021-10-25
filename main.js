
// require is provided by loader.min.js.
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
require(["vs/editor/editor.main"], () => {
  monaco.editor.create(document.getElementById('container'), {
    value: `function x() {
  console.log("Hello world!");
}`,
    language: 'javascript',
    theme: 'vs-dark',
  });
});