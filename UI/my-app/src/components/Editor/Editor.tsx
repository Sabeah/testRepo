import React, { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { useSelector, useDispatch } from "react-redux";
import { getDataWithAuth } from "../../Utils/api";
import setData from "../../redux/actions";

const mdParser = new MarkdownIt();

interface EditorValue {
    html: any;
    text: string;
}

const Editor = () => {
    // const data = useSelector((state) => state.data.test);
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("");
    function handleEditorChange(input: EditorValue) {
        console.log("handleEditorChange", input.html, input.text);
        setInputText(input.text);
    }

    const getPosts = async () => {
        const res = await getDataWithAuth("/posts");
        console.log("res =====>", res);
        dispatch(setData(res));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div style={{ padding: "5%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <button
                    style={{
                        background: "#007fe1",
                        color: "#ffffff",
                        width: 80,
                        height: 30,
                        marginBottom: 10,
                        borderRadius: 5,
                    }}
                    onClick={() => console.log("button reset")}
                >
                    Reset
                </button>
            </div>
            <div style={{ display: "flex" }}>
                <MdEditor
                    style={{ height: "500px", width: "50%" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
                <MdEditor
                    style={{ height: "500px", width: "50%" }}
                    renderHTML={(text) => mdParser.render(text)}
                    readOnly
                    value={inputText}
                    view={{ menu: false, md: false, html: true }}
                    // onChange={handleEditorChange}
                />
            </div>
        </div>
    );
};

export default Editor;
