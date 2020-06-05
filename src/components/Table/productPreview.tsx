import React from "react";
import ModalComponent from "../Modal/modal";
import {Container, ImageContainer, PreviewProductDetailsContainer} from "../../pages/Dasboard/inventory/styles";
import {Editor} from "react-draft-wysiwyg";
import {convertFromRaw, EditorState} from "draft-js";


const styles = {
    width: "850px",
    height: "600px",
};

export const ProductPreview  = (isOpen: boolean, setModalOpen:Function) => {
    return (
        <>
            <ModalComponent styles={styles}  isOpen={isOpen} close={setModalOpen}>
                <div>
                    <PreviewProductDetailsContainer>
                        <ImageContainer>
                            <div>
                                <div className="image__pad">
                                    {/*<div className="item__image" style={{backgroundImage: `url(${files.length && URL.createObjectURL(files[0])})`}}>*/}
                                    </div>
                                </div>
                                <div className="images__container">
                                </div>

                        </ImageContainer>
                        <div style={{width: "40%"}}>
                            <Container >

                                <div className="title__container">
                                    <span className="title">Product Information </span>
                                </div>
                            </Container>
                            <div className="divider"/>
                            <Container>

                                <div className="title__container">
                                    <span className="title">Product Description </span>
                                </div>
                                {/*{*/}
                                {/*    Object.keys(product).map((productKey, index) => {*/}
                                {/*        if (typeof product[productKey] === 'object') {*/}
                                {/*            return ''*/}
                                {/*        }*/}
                                {/*        if (productKey === "description") {*/}
                                {/*            return (*/}
                                {/*                <Editor*/}
                                {/*                    key={index.toString()}*/}
                                {/*                    readOnly*/}
                                {/*                    toolbarHidden*/}
                                {/*                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(product[productKey])))}*/}
                                {/*                />*/}
                                {/*            )*/}
                                {/*        }*/}
                                {/*    })*/}
                                {/*}*/}
                            </Container>
                            <div className="divider"/>
                            <Container>
                                <div className="title__container">
                                    <span className="title">Product Pricing </span>
                                </div>

                            </Container>
                        </div>
                    </PreviewProductDetailsContainer>
                </div>
            </ModalComponent>
            </>
    )
};
