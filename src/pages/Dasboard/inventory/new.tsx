import React, {useContext, useState} from "react";
import Box from "components/Box";
import useBeforeUnload from "use-before-unload";

import {Tabs, Breadcrumb, Progress, Col, Row } from "antd";
import ProductInfo from "./productInfo";
import Image from "./images";
import Description from "./description";
import Pricing from "./pricing";
import {CategoriesContainer, ButtonContainer, Button, UploadContainer} from "./styles";
import Buttons from "components/Button";
import {Center} from "components";
import {useSelector} from "react-redux";
import Preview from "./preview";
import Additional from "./additional";
import { createProductSeller } from "../../../state/product/createProduct";
import { useMutation } from "redux-query-react";
import {Product} from "../../../api/src/models";
import ThemeContext from "../../../providers/themes/ThemeContext";


const {TabPane} = Tabs;

const CategoriesSelect: React.FC<any> = ({
                                             selectedCategories,
                                             selectCategory,
                                             onNext
                                         }) => {
    const rootCategories = useSelector(
        (state: any) => state.entities.rootCategories
    );
    const { themes } = useContext(ThemeContext);

    const [stateSubCategories, setSubCategories] = useState<any>([]);
    const [list, setList] = useState(false);
    const [indices, setIndices] = useState<any>([]);

    const handleSetSubCategory = (
        currentSubCategories: any,
        newSubCategories: any,
        category: any,
        index: number
    ) => {
        // keeping track of click indices in the state
        if (index !== undefined) {
            setIndices([...indices, index]);
        }
        // filtering the two list to check the differences
        // In case of no differences i set the current list of subcategories
        if (
            currentSubCategories.filter((item: any) => item === newSubCategories)
                .length
        ) {
            setSubCategories([...currentSubCategories]);
        } else {
            // i'm using index here to know where I need to remove subcategories
            // clicking on a subcategory gives me an  index for the purpose of splicing here
            if (currentSubCategories.length > 0 && indices[0] === index) {
                currentSubCategories.splice(index + 1, currentSubCategories.length);
            }
            if (indices[indices.length - 1] === index && index !== undefined) {
                currentSubCategories.splice(index + 1, currentSubCategories.length);
            }
            if (index === undefined) {
                currentSubCategories.splice(index + 1, currentSubCategories.length);
            }
            setSubCategories([...currentSubCategories, newSubCategories]);
        }
    };

    const setCategory = ({category, subcategories, type, id, index}: any) => {
        selectCategory({...selectedCategories, [`${type}`]: {category, id}});
        if (subcategories.length > 0) {
            handleSetSubCategory(stateSubCategories, subcategories, category, index);
            setList(false);
        } else {
            if (index + 1 < stateSubCategories.length) {
                const newCategories = stateSubCategories;
                newCategories.splice(index + 1, newCategories.length);
                setSubCategories([...newCategories]);
            }
            if (index === undefined) {
                const newCategories = [...stateSubCategories];
                newCategories.splice(0, newCategories.length);
                setSubCategories([...newCategories]);
            }
            setList(true);
        }
    };

    const setSelected = (selectedCategory: any, type: string) => {
        const isSelected: any = [];
        Object.keys(selectedCategories).forEach(category => {
            if (
                selectedCategories[category].category === selectedCategory &&
                category === type
            ) {
                isSelected.push(true);
            }
        });
        return isSelected[0];
    };

    const renderCategories = (categories: any, type: string, index: any) => {
        return categories.map(({name, id, subcategories}: any, i: number) => (
            <span
                key={i.toString()}
                className={setSelected(name, type) ? "selected" : ""}
                onClick={() =>
                    setCategory({category: name, subcategories, type, id, index})
                }
            >
        {name}
                {subcategories.length > 0 ? "> " : ""}
      </span>
        ));
    };

    if (!rootCategories) {
        return <>loading ......</>;
    }

    return (
        <>
            <UploadContainer>
                <h1>Create a new product</h1>
                <a href={`${process.env.PUBLIC_URL}/ProductCreationTemplate.xlsx`} download="product_template">Download CSV </a>
            </UploadContainer>

            <p>
                To start creating a detail page, first select a primary category for
                your product.
            </p>

            <Box>
                <h2>Browse for your product’s category</h2>

                <p>
                    Note: If you do not see your products category listed below, it may
                    either require approval or be restricted. <a>Click here </a> to learn
                    more.
                </p>

                <Breadcrumb separator=">">
                    <Breadcrumb.Item>All Product Categories</Breadcrumb.Item>
                    <Breadcrumb.Item>Main Category</Breadcrumb.Item>
                    <Breadcrumb.Item>Category</Breadcrumb.Item>
                    <Breadcrumb.Item>Sub category</Breadcrumb.Item>
                </Breadcrumb>
                <CategoriesContainer>
                    <div className="categories__options">
                        {renderCategories(rootCategories.results, "main", undefined)}
                    </div>
                    {stateSubCategories.map((subCategory: any, index: number) => (
                        <div className="categories__options">
                            {renderCategories(subCategory, "category", index)}
                        </div>
                    ))}
                </CategoriesContainer>
                <ButtonContainer list={list}>
                    <Buttons onClick={onNext} style={{width: 200}}>
                        {" "}
                        Select{" "}
                    </Buttons>
                </ButtonContainer>
            </Box>
        </>
    );
};

const ProductDetails = () => {

    const [product, setProduct] = useState<any>({
        name: "",
        brand: "",
        color: ""
    });
    const [files, setFiles] = useState([]);
    const [contentScore, setContentScore] = useState({
        description: 0,
        images: 0,
        variants: 0,
        info: 0,
        packages: 0,
        bold: 0
    });

    const totalScore = () => {
        const {
            description,
            info,
            images,
            variants,
            bold,
            packages
        } = contentScore;
        return description + info + images + variants + bold + packages;
    };
    const [current, setCurrent] = useState("1");
    const [categoryPage, setCategoryPage] = useState(true);
    const [categories, setCategories] = useState<any>({
        main: {},
        category: {},
        sub: {}
    });


    const sellerId = useSelector((state: any) => state.entities.seller && state.entities.seller.id)

    const inputChange = (e: any) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const setProductDetailsPage = () => {
        setCategoryPage(!categoryPage);
    };

    const onNext = (
        data: Product
    ) => {

        setProduct({
            ...product,
            ...data
        });
    };

    function callback(key: any): void {
        setCurrent(key);
    }

    const [variations, setVariations] = useState<Array<string>>([]);


    useBeforeUnload(evt => {
        /* Do some checks here if you like */
        return true; // Suppress reload
    });

    // create root product product
    const [{ isPending }, createProductForSeller] = useMutation((optimistic) => {
        const id  = categories.category.id === undefined ? categories.main.id : categories.category.id;
        return createProductSeller(product, sellerId , id, optimistic)
    });

    return (
        <>
            {categoryPage ? (
                <CategoriesSelect
                    selectedCategories={categories}
                    selectCategory={setCategories}
                    onNext={setProductDetailsPage}
                />
            ) : (
                <>
                    <h1>Add new product information</h1>
                    <p>
                        Complete all the details about your product to improve it’s
                        visibility to buyers across the platform.
                    </p>
                    <Box>
                        <Row gutter={16}>
                            <Col span={14}>
                                <Tabs
                                    defaultActiveKey="1"
                                    onChange={callback}
                                    activeKey={current}
                                >
                                    <TabPane
                                        tab="Basic Information"
                                        key="1"
                                        disabled={current < "1"}
                                    >
                                        <ProductInfo
                                            product={product}
                                            callback={callback}
                                            onChange={inputChange}
                                            onPrevClick={setProductDetailsPage}
                                            onNext={onNext}
                                        />
                                    </TabPane>

                                    <TabPane
                                        tab="Additional Details"
                                        key="2"
                                        disabled={current < "2"}
                                    >
                                        <Additional
                                            product={product}
                                            onChange={inputChange}
                                            onNext={onNext}
                                            callback={callback}
                                            setSize={setVariations}

                                        />
                                    </TabPane>

                                    <TabPane tab="Product Pricing" key="3" disabled={current < "3"}>
                                        <Pricing
                                            callback={callback}
                                            onNext={onNext}
                                            product={product}
                                            variations={variations}
                                        />
                                    </TabPane>

                                    <TabPane tab="Description" key="4" disabled={current < "4"}>
                                        <Description
                                            score={contentScore}
                                            setScore={setContentScore}
                                            callback={callback}
                                            product={product}
                                            onChange={inputChange}
                                            onNext={onNext}
                                        />
                                    </TabPane>


                                    <TabPane tab="Images" key="5" disabled={current < "5"}>
                                        <Image
                                            score={contentScore}
                                            setScore={setContentScore}
                                            files={files}
                                            setFiles={setFiles}
                                            callback={callback}
                                            product={product}
                                        />
                                    </TabPane>

                                    <TabPane tab="Preview" key="6" disabled={current < "6"}>
                                        <Preview
                                            files={files}
                                            callback={callback}
                                            submitting={isPending}
                                            product={product}
                                            categoryId={categories.main.id}
                                            submit={createProductForSeller}
                                        />
                                    </TabPane>
                                </Tabs>
                            </Col>

                            <Col span={6}>
                                <Center>
                                    <Progress
                                        type="circle"
                                        percent={totalScore()}
                                        strokeColor={{
                                            "0%": "#108ee9",
                                            "100%": "#87d068"
                                        }}
                                        strokeWidth={3}
                                        format={(percent: any) => (
                                            <div>
                                                <span> {percent / 10} out of 10 </span>
                                                <span> Content Score </span>
                                            </div>
                                        )}
                                        width={150}
                                    />
                                </Center>
                            </Col>
                        </Row>
                    </Box>
                </>
            )}
        </>
    );
};

const NewProduct = () => {
    return (
        <>
            <ProductDetails/>
        </>
    );
};

export default NewProduct;
