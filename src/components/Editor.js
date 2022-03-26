import React, { useEffect } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Editor = () => {
  useEffect(() => {
    async function init() {
      Codemirror.fromTextArea(document.getElementById("realtimeEditor"), {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: true,
        autoCloseBrackets: true,
        autofocus: true,
        autoCloseTags: true,
        extraKeys: {
          Tab: "indentMore",
          "Shift-Tab": "indentLess",
        },
      });
    }

    init();
  }, []);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
