import React from "react";
import ModalComponent from "../Modal/modal";
import {Container, ImageContainer, PreviewProductDetailsContainer} from "../../pages/Dasboard/inventory/styles";
import Image from 'icons/background.jpeg'
import Image1 from 'icons/image1.jpeg'
import Image2 from 'icons/image2.jpeg'
import Image3 from 'icons/image3.jpeg'
import {Editor} from "react-draft-wysiwyg";
import styled, { css } from 'styled-components';
import {convertFromRaw, EditorState} from "draft-js";


const MainDiv = styled.div`
    width: 90%;
    margin: 0 auto;
`

const styles = {
    width: "850px",
    height: "600px",
};

const formattedFiles = [
    Image1,
    Image2,
    Image3,
    Image
]

let currentImage = Image;

export const ProductPreview  = (isOpen: boolean, setModalOpen:Function) => {
    return (
        <>
            <ModalComponent styles={styles}  isOpen={isOpen} close={setModalOpen}>
                <MainDiv>
                    <h1>Product Details</h1>
                    <PreviewProductDetailsContainer>
                        <ImageContainer>
                            <div>
                                <div className="image__pad">
                                    {/* <div className="item__image" style={{backgroundImage: `url(${files.length && URL.createObjectURL(files[0])})`}}> */}
                                    <div className="item__image" style={{backgroundImage: `url(${currentImage})`}}></div>
                                </div>
                            </div>
                            <div className="images__container">
                                {
                                    formattedFiles.map((file, index) => {
                                        // const filePath = URL.createObjectURL(file);
                                        return  (
                                            <div className="image__pad image__pad--small">
                                                <div key={index.toString()} className='item__image images' style={{backgroundImage: `url(${file})`}}>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
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
                </MainDiv>
            </ModalComponent>
            </>
    )
};
