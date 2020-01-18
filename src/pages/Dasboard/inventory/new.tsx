import React, { useState, useEffect } from 'react';
import Box from 'components/Box';

import { Tabs, Breadcrumb, Progress, Col, Row,} from 'antd';
// import ProductInfo from './productInfo';
// import Image from './images';
import Description from './description';
// import Pricing from './pricing';
// import { useQuery } from '@apollo/react-hooks';
// import { GET_PARENT_CATEGORY } from "../../../utils/queries/inventory/index"
import { CategoriesContainer, ButtonContainer } from './styles'
import Buttons from 'components/Button'
// import { fetchSubCategoryQuery } from "../../../utils/queries/inventory/customQueries";
import {Center} from "components";
// import Preview from "./preview";

const { TabPane } = Tabs;


const CategoriesSelect: React.FC<any> = ({ selectedCategories, selectCategory, onNext }) => {

    // const { loading, data, error }  = useQuery(GET_PARENT_CATEGORY);
    const [ subCategories, setSubCategories] = useState([]);
    const [ list, setList] = useState(false);
    const [indices, setIndices] = useState([]);

    // const handleSetSubCategory = (currentSubCategories,newSubCategories, category, index)=>{
    //     // keeping track of click indices in the state
    //     if ( index !== undefined) { setIndices([...indices,index]); }
    //     // filtering the two list to check the differences
    //     // In case of no differences i set the current list of subcategories
    //     // haha i dont know why but it works
    //     // dont touch any changes must go through me
    //     if ( currentSubCategories.filter((item)=>(item === newSubCategories)).length){
    //         setSubCategories([
    //             ...currentSubCategories
    //         ])
    //     } else {
    //        // i'm using index here to know where I need to remove subcategories
    //        // clicking on a subcategory gives me an  index for the purpose of splicing here
    //        if (currentSubCategories.length > 0 && indices[0] === index){
    //             currentSubCategories.splice(index + 1, currentSubCategories.length)
    //         }
    //         setSubCategories([
    //             ...currentSubCategories,
    //             newSubCategories
    //         ])
    //     }
    // };
    // if(loading) {
    //     return (
    //         <>
    //              <div>
    //                  kimame
    //              </div>
    //     </>
    //     )
    // }

    // const setCategory = ({category, type , id ,index}) =>  {
    //     selectCategory( { ...selectedCategories, [`${type}`]: { category, id}});
    //     fetchSubCategoryQuery(id).then(data => {
    //         if(data.subCategories.list.length > 0){
    //             handleSetSubCategory(subCategories, data.subCategories.list, category, index);
    //             setList(false)
    //         } else {
    //             if( index + 1 < subCategories.length) {
    //                 const newCategories =  [...subCategories];
    //                 newCategories.pop();
    //                 setSubCategories([...newCategories])
    //             }
    //             if(index === undefined){
    //                 const newCategories =  [...subCategories];
    //                 newCategories.splice(0, newCategories.length);
    //                 setSubCategories([...newCategories])
    //             }
    //             setList(true)
    //         }
    //     })
    // };

    // const setSelected = ( selectedCategory, type ) => {
    //     const isSelected =  [];
    //     Object.keys(selectedCategories).forEach(category => {
    //         if(selectedCategories[category].category === selectedCategory && category === type){
    //             isSelected.push(true)
    //         }
    //     });
    //     return isSelected[0]
    // };


    // const renderCategories = ( categories, type: string, index: number | undefined ) => {
    //     return categories.map( ({name, id}, i) => (
    //         <span
    //             key={i.toString()}
    //             className={ setSelected(name, type) ? "selected" : "" }
    //             onClick={() => setCategory({ category:name, type, id ,index})}>
    //              { name } >
    //         </span>
    //     ))
    // };

    return (
        <>
            <h1>Create a new product</h1>
            <p>To start creating a detail page, first select a primary category for your product.</p>


                <h2>Browse for your product’s category</h2>

                <p>Note: If you do not see your products category listed below, it may either require approval or be restricted. <a>Click here </a> to learn more.</p>

                <Breadcrumb separator=">">
                    <Breadcrumb.Item>All Product Categories</Breadcrumb.Item>
                    <Breadcrumb.Item >Main Category</Breadcrumb.Item>
                    <Breadcrumb.Item >Category</Breadcrumb.Item>
                    <Breadcrumb.Item>Sub category</Breadcrumb.Item>
                </Breadcrumb>


        </>
    )
};

const ProductDetails = () => {
    const [ product, setProduct ] = useState({
        name: "",
        brand: "",
        color: "",
    });
    const [files, setFiles] = useState([]);
    const [contentScore, setContentScore] = useState({
        description: 0,
        images:0,
        variants:0,
        info:0,
        packages:0,
        bold: 0
    });

    const totalScore = () => {
        const { description, info, images, variants, bold, packages} = contentScore;
        return description + info + images + variants + bold + packages;
    };
    const [ current , setCurrent ] = useState("4");
    const [ categoryPage, setCategoryPage] = useState(true);
    const [ categories, setCategories ] = useState({
        main: {},
        category: {},
        sub: {}
    });

    const inputChange = (e: any) => {
        const { name , value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    };

    const setProductDetailsPage = () => {
        setCategoryPage(!categoryPage);
    };

    const onNext = (data: React.SetStateAction<{ name: string; brand: string; color: string; }>) => {
        setProduct({
            ...product,
            ...data
        });

        setCurrent( (Math.min(4, parseInt(current) + 1)).toString())
    };

    function callback(key: any) {
        setCurrent(key)
    }

    return (
        <>
            {
                categoryPage ? <CategoriesSelect
                    selectedCategories={categories}
                    selectCategory={setCategories}
                    onNext={setProductDetailsPage}/>
                    : (
                    <>
                    <h1>Add new product information</h1>
            <p>Complete all the details about your product to improve it’s visibility to buyers across the platform.</p>
            <Box>
                <Row gutter={16}>
                    <Col span={16}>
                        <Tabs defaultActiveKey="1" onChange={callback} activeKey={current}>
                            {/* <TabPane tab="Product Info" key="1">
                                <ProductInfo product={product} onChange={inputChange} onPrevClick={setProductDetailsPage} onNext={onNext}  />
                            </TabPane>

                            <TabPane tab="Description" key="2">
                                <Description
                                    score={contentScore}
                                    setScore={setContentScore}
                                    callback={callback}
                                    product={product}
                                    onChange={inputChange}
                                    onNext={onNext}  />
                            </TabPane>


                            <TabPane tab="Product Pricing" key="3">
                                <Pricing callback={callback}  onNext={onNext} product={product} />
                            </TabPane>

                            <TabPane tab="Images" key="4">
                                <Image
                                    score={contentScore}
                                    setScore={setContentScore}
                                    files={files}
                                    setFiles={setFiles}
                                    callback={callback}
                                    product={product}
                                    />
                            </TabPane>

                            <TabPane tab="Preview" key="5">
                                <Preview
                                    files={files}
                                    callback={callback}
                                    product={product}
                                    categoryId={categories.main.id}/>
                            </TabPane>

                            */}

                        </Tabs>

                    </Col>

                    <Col span={8}>
                      <Center>
                        <Progress
                            type="circle"
                            percent={totalScore()}
                            strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                            }}

                            strokeWidth={3}
                            format={(percent: any) => (
                                <div>
                                  <span> {(percent / 10)} out of 10 </span>
                                  <span> Content Score </span>
                                </div>
                                )}
                                width={150} />
                        </Center>

                    </Col>
                </Row>
            </Box>
                        </>
                )
            }
            </>
    )
};

const NewProduct = () => {
    return (
        <>
            <ProductDetails />
        </>
    );
};

export default NewProduct;
