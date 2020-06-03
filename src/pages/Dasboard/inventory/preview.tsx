import React, {useCallback} from 'react'
import {Action, getBase64} from "./images";
import { Button, notification, Icon } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import { ImageContainer, PreviewProductDetailsContainer, Container} from "./styles";
import {useMutation} from "redux-query-react";
import {createProductVariation, productAddMedia} from "../../../state/product/createProduct";


const PreviewComponent: React.FC<any> = ({ callback, product, history, files, submit }) => {
    const formattedFiles = [ ...files].splice(1, files.length - 1);

    const [{ isPending, isFinished, status }, addMedia] =
        useMutation(( id, file, path) => productAddMedia(id, file, path ));


    const formatVariant = () => {
        let variant;
        Object.keys(product).forEach(productKey => {
            if (typeof product[productKey] === 'object') {
                const variantDetail =  product[productKey][0];
                variant =  {
                    "inventory Quantity": variantDetail.inventoryQuantity,
                    "weight": variantDetail.weight,
                    "actual price": variantDetail.minimumPrice,
                    price: variantDetail.salePrice,
                }
            }
        });
        return variant;
    };

    const variant: any = formatVariant();


    const [{}, createProductVariant] = useMutation((id) => {
        return createProductVariation({id , values: product.variants })
    });


    const handleUpload = useCallback(optimistic => {
        optimistic.preventDefault();
        submit(optimistic).then((result: any )=>{
            const { status } = result;
            if( status === 201) {
                const { body: { id } } = result;
                createProductVariant(id).then((result: any) =>{
                    const { status } = result;
                    if(status === 201){
                        files.fileList.forEach( (file: any) =>  {
                            getBase64(file).then(url => {
                                addMedia(id, url , file.name ).then(()=>{}).catch(()=>{})
                            })
                        })
                    }
                });

            }
        })

    }, [submit]);

    return (
        <>
            <PreviewProductDetailsContainer>
                <ImageContainer>
                    <div>
                        <div className="image__pad">
                            <div className="item__image" style={{backgroundImage: `url(${files.length && URL.createObjectURL(files[0])})`}}>
                            </div>
                        </div>
                        <div className="images__container">
                            {
                                formattedFiles.length ?
                                    formattedFiles.map((file, index) => {
                                        const filePath = URL.createObjectURL(file);
                                        return  (
                                            <div className="image__pad image__pad--small">
                                                <div key={index.toString()} className='item__image images' style={{backgroundImage: `url(${filePath})`}}>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    < div style={{ visibility: files.length ? 'hidden' : "visible",}} className="empty__images">
                                        <Icon type="file-jpg" style={{ width: '10em', height:"10em" , color: '#08c' }} theme="outlined" />
                                        <span onClick={() => callback("4")}> Add images </span>
                                    </div>
                            }
                        </div>
                    </div>

                </ImageContainer>
                <div style={{width: "40%"}}>
                    <Container >

                        <div className="title__container">
                            <span className="title">Product Information </span>
                            <Icon onClick={() =>callback("2")} type="form" />
                        </div>

                        {
                            Object.keys(product).map((productKey, index) => {
                                if(typeof product[productKey] === 'object'|| productKey === "description"){
                                    return ''
                                }
                                return (
                                    <div className="product__description" key={index.toString()}>
                                        <label> {productKey} </label>
                                        <span> {product[productKey]} </span>
                                    </div>
                                )
                            })
                        }
                    </Container>
                    <div className="divider"/>
                    <Container>

                        <div className="title__container">
                            <span className="title">Product Description </span>
                            <Icon onClick={() =>callback("3")} type="form" />
                        </div>
                        {
                            Object.keys(product).map((productKey, index) => {
                                if (typeof product[productKey] === 'object') {
                                    return ''
                                }
                                if (productKey === "description") {
                                    return (
                                        <Editor
                                            key={index.toString()}
                                            readOnly
                                            toolbarHidden
                                            editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(product[productKey])))}
                                        />
                                    )
                                }
                            })
                        }
                    </Container>
                    <div className="divider"/>
                    <Container>
                        <div className="title__container">
                            <span className="title">Product Pricing </span>
                            <Icon onClick={() =>callback("4")} type="form" />
                        </div>
                        {
                            typeof variant !== "undefined" ?
                                Object.keys(variant).map((price, index) => {
                                    return  (
                                        <div className="product__description" key={index.toString()}>
                                            <label> {price} </label>
                                            <span> {variant[price]} </span>
                                        </div>
                                    )
                                }): ''
                        }

                    </Container>
                </div>
            </PreviewProductDetailsContainer>
            <Action>
                <Button onClick={()=>callback("5")}> Back </Button>
                <Button loading={isPending} onClick={handleUpload} type="primary" > Submit and Finish </Button>
            </Action>
        </>
    );

};

export default PreviewComponent;
