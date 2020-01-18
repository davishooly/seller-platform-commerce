import React  from 'react'
// import { withRouter } from "react-router-dom";
import { Action } from "./images";
import { Button, notification, Icon } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import { ImageContainer, PreviewProductDetailsContainer, Container} from "./styles";
// import {useMutation} from "@apollo/react-hooks";
// import {ADD_PRODUCT_IMAGE_MUTATION, CREATE_PRODUCT_MUTATION} from "../../../utils/mutations/products";
// import { cacheProduct } from "../../../utils/queries/inventory/customQueries";
// import { ROUTES } from "../../../router";

const PreviewComponent: React.FC<any> = ({ callback, product, history, files, categoryId }) => {

  // create product mutation
  // const [ createProduct ] = useMutation(CREATE_PRODUCT_MUTATION, {
  //   onCompleted(data) {
  //     // cacheProduct(data.createProduct);
  //     const { id } = data.createProduct;
  //     afterMutation(id);
  //   },
  //   onError(error) {
  //     if(error.graphQLErrors && error.graphQLErrors.length > 0){
  //       const errorMessage = error.graphQLErrors[0].message;
  //       notification.error({
  //         message: "Error",
  //         description: errorMessage
  //       });
  //     }
  //   }
  // });

  //add product image mutation
  // const afterMutation = (id: any) => {
  //   saveImages(
  //       {
  //         variables: {
  //           files: files,
  //           productVariantID: id
  //         }
  //       }
  //   )
  // };

  // // upload product image mutation
  // const [saveImages,  { loading }] = useMutation( ADD_PRODUCT_IMAGE_MUTATION, {
  //   onCompleted(data) {
  //     notification.success({
  //       message: "Success",
  //       description: "Product created successfully"
  //     });
  //     setTimeout(() => {
  //       history.push(ROUTES.inventory)
  //     }, 1000)
  //   },
  //   onError(error) {
  //     if(error.graphQLErrors && error.graphQLErrors.length > 0){
  //       const errorMessage = error.graphQLErrors[0].message;
  //       notification.error({
  //         message: "Error",
  //         description: errorMessage
  //       });
  //     }
  //   }
  // });

  // //submit details
  // const onFinish = () => {
  //   createProduct({
  //     variables: {
  //       ...product,
  //       category:categoryId
  //     }
  //   })
  // };

  const formattedFiles = [ ...files].splice(1, files.length - 1);

  const formatVariant = () => {
    let variant;
    Object.keys(product).forEach(productKey => {
      if (typeof product[productKey] === 'object') {
        const variantDetail =  product[productKey][0];
        variant =  {
          "inventory Quantity": variantDetail.inventoryQuantity,
          "wight unit": variantDetail.weightUnit,
          "actual price": variantDetail.compareAtPrice,
          price: variantDetail.price,
          "variant name": variantDetail.name
        }
      }
    });
    return variant;
  };

  const variant: any = formatVariant();

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
            <Icon onClick={() =>callback("1")} type="form" />
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
           <Icon onClick={() =>callback("2")} type="form" />
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
                <Icon onClick={() =>callback("3")} type="form" />
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
          <Button onClick={()=>callback("4")}> Back </Button>
          <Button type="primary" > Submit and Finish </Button>
        </Action>
        </>
  );

};

export default PreviewComponent;
