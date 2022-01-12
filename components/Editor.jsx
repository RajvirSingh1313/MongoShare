import React from "react"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-cobalt";

const Editor = ({ language, theme, onchange, value, readonly }) => {

    if (language !== undefined) require(`ace-builds/src-noconflict/mode-${language}`)
    return (
        <AceEditor
            mode={language}
            theme="cobalt"
            onChange={onchange}
            name="code_editor"
            editorProps={{ $blockScrolling: true }}
            fontSize={16}
            width="100%"
            height="350px"
            value={value ? value : ""}
            readOnly={readonly ? readonly : false}
        />
    )
}

export default Editor