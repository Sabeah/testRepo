import { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { useSelector, useDispatch } from "react-redux";
import { getDataWithAuth } from "../../Utils/api.js";
import setData from "../../redux/actions";
import { RootState } from "../../redux/store.js";

const mdParser = new MarkdownIt();

interface EditorValue {
    html: any;
    text: string;
}

const Editor = () => {
    let searches = useSelector((state: RootState) => {
        return state.data.searches;
    });
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("");
    const [wikiDetails, setWikiDetails] = useState({
        title: "Pakistan",
        description:
            "Pakistan, officially the Islamic Republic of Pakistan, is a country in South Asia. It is the world's fifth-most populous country, with a population exceeding 225.1 million, and has the world's second-largest Muslim population. Pakistan is the 33rd-largest country by area, spanning 881,913 square kilometres (340,509 square miles). It has a 1,046-kilometre (650-mile) coastline along the Arabian Sea and Gulf of Oman in the south, and is bordered by India to the east, Afghanistan to the west, Iran to the southwest, and China to the northeast. It is separated narrowly from Tajikistan by Afghanistan's Wakhan Corridor in the north, and also shares a maritime border with Oman.\nPakistan is the site of several ancient cultures, including the 8,500-year-old Neolithic site of Mehrgarh in Balochistan, and the Indus Valley Civilisation of the Bronze Age, the most extensive of the civilisations of the Old World. The region that comprises the modern state of Pakistan was the realm of multiple empires and dynasties, including the Achaemenid; briefly that of Alexander the Great; the Seleucid, the Maurya, the Kushan, the Gupta; the Umayyad Caliphate in its southern regions, the Hindu Shahi, the Ghaznavids, the Delhi Sultanate, the Mughals, the Durranis, the Sikh Empire, British East India Company rule, and most recently, the British Indian Empire from 1858 to 1947.\nSpurred by the Pakistan Movement, which sought a homeland for the Muslims of British India, and election victories in 1946 by the All-India Muslim League, Pakistan gained independence in 1947 after the Partition of the British Indian Empire, which awarded separate statehood to its Muslim-majority regions and was accompanied by an unparalleled mass migration and loss of life. Initially a Dominion of the British Commonwealth, Pakistan officially drafted its constitution in 1956, and emerged as a declared Islamic republic. In 1971, the exclave of East Pakistan seceded as the new country of Bangladesh after a nine-month-long civil war. In the following four decades, Pakistan has been ruled by governments whose descriptions, although complex, commonly alternated between civilian and military, democratic and authoritarian, relatively secular and Islamist. Pakistan elected a civilian government in 2008, and in 2010 adopted a parliamentary system with periodic elections.Pakistan is a middle power, and has the world's sixth-largest standing armed forces. It is a declared nuclear-weapons state, and is ranked amongst the emerging and growth-leading economies, with a large and rapidly-growing middle class. Pakistan's political history since independence has been characterized by periods of significant economic and military growth as well as those of political and economic instability. It is an ethnically and linguistically diverse country, with similarly diverse geography and wildlife. However, the country continues to face challenges, including poverty, illiteracy and corruption. Pakistan is a member of the United Nations, the Shanghai Cooperation Organisation, the Organisation of Islamic Cooperation, the Commonwealth of Nations, the South Asian Association for Regional Cooperation, the Islamic Military Counter-Terrorism Coalition, and is designated as a major non-NATO ally by the United States.",
        phrase: "",
        id: 0,
    });
    const [showHistory, setShowHistory] = useState(false);

    function handleEditorChange(input: EditorValue) {
        setInputText(input.text);
    }

    const getwikiDetails = async (phrase: any) => {
        const res = await getDataWithAuth(`/post/search?phrase=${phrase}`);
        if (!res.isError) {
            const data: any = res.data;
            setWikiDetails(data);
            let tempSearches = searches;
            tempSearches.push(data);
            dispatch(setData(tempSearches));
        } else {
            setWikiDetails({
                title: "",
                description: "",
                phrase: "",
                id: 0,
            });
        }
    };

    document.onmouseup = () => {
        const selection = window.getSelection()?.toString();
        if (selection !== "") {
            getwikiDetails(selection);
        }
    };

    const handleDeleteSearch = (id: any) => {
        const tempSearches = searches.filter((item: any) => item.id !== id);
        dispatch(setData(tempSearches));
    };

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
                        width: 100,
                        height: 30,
                        marginBottom: 10,
                        borderRadius: 5,
                        marginRight: 10,
                    }}
                    onClick={() => {
                        setShowHistory(false);
                        setInputText("");
                        setWikiDetails({
                            title: "",
                            description: "",
                            phrase: "",
                            id: 0,
                        });
                    }}
                >
                    Reset
                </button>
                <button
                    style={{
                        background: "#007fe1",
                        color: "#ffffff",
                        width: 100,
                        height: 30,
                        marginBottom: 10,
                        borderRadius: 5,
                    }}
                    onClick={() => {
                        setShowHistory(true);
                        setWikiDetails({
                            title: "",
                            description: "",
                            phrase: "",
                            id: 0,
                        });
                    }}
                >
                    Show History
                </button>
            </div>
            <div style={{ display: "flex" }}>
                <MdEditor
                    style={{ height: "300px", width: "50%" }}
                    renderHTML={(text) => mdParser.render(text)}
                    value={inputText}
                    onChange={handleEditorChange}
                    view={{ menu: true, md: true, html: false }}
                />
                <MdEditor
                    style={{ height: "300px", width: "50%" }}
                    renderHTML={(text) => mdParser.render(text)}
                    readOnly
                    value={inputText}
                    view={{ menu: false, md: false, html: true }}
                />
            </div>
            {showHistory &&
                searches.map((item: any) => (
                    <div
                        style={{
                            marginTop: 30,
                            display: "flex",
                            justifyContent: "space-between",
                            width: "50%",
                        }}
                    >
                        <div>{item.phrase}</div>
                        <button
                            style={{
                                background: "#007fe1",
                                color: "#ffffff",
                                width: 100,
                                height: 30,
                                marginBottom: 10,
                                borderRadius: 5,
                            }}
                            onClick={() => {
                                handleDeleteSearch(item.id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            <div style={{ marginTop: 30 }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>
                    {wikiDetails.title}
                </div>
                <div style={{ lineHeight: 1.5 }}>{wikiDetails.description}</div>
            </div>
        </div>
    );
};

export default Editor;
