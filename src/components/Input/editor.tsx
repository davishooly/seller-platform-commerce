import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



class RichEditor extends Component <any> {
    state = {
        editorState: EditorState.createEmpty(),
    };

    onEditorStateChange = (editorState: any) => {
        this.setState({
            editorState,
        });

        this.props.onChange(editorState, this.props.editorType )
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    placeholder={this.props.placeholder}
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}


export default RichEditor
