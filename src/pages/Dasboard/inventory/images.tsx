import React, {useEffect, useState} from 'react';
import { Upload, Icon, Modal, Button } from 'antd';
import styled from "styled-components"
import notification from '../../../utils/toast';
import { useMutation } from 'redux-query-react';
import { productAddMedia } from './createProduct';


function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


function beforeUpload(file: Blob) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        notification.error({
            message: "Error",
            description: "You can only upload JPG/PNG file!"
        });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        notification.error({
            message: "Error",
            description: "Image must smaller than 2MB!"
        });
    }
    return isJpgOrPng && isLt2M;
}


const Container = styled.div`
   .ant-upload-list-item-error {
      border-color: unset;
      color: unset;
   }
   .ant-upload-list-item-undefined {
      border-color: red;
      color: red;
   }
`;


export const Action = styled.div`
    button {
        margin-right: 2rem;
    }
`;

const Image = ({ callback, score, setScore, files, setFiles, submit }: any) => {
    const [state, setState] = useState<any>({
        previewVisible: false,
        previewImage: '',
        fileList: [],
        loading: false,
    });

    const [{ isPending }, addMedia] = useMutation(( id, file, path) => productAddMedia(id, file, path ))

    useEffect(()=> {
        if(state.fileList.length >= 0){
            handleScore();
        }
    },[ state.fileList]);


    const handleScore = () => {
            setScore({
                ...score,
                images: state.fileList.length >= 3 ? 10 : state.fileList.length * 4
            })
    };

    const handleCancel = () => setState({ previewVisible: false });

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
           
        }

        setState({
            previewImage: file.url || file.preview,
            previewVisible: true
        });
    };


    const handleUpload = () => {
        submit().then((result: any )=>{
            const { body: { id } } = result;
            state.fileList.forEach( (file: any) =>  {
                getBase64(file).then(url => {
                    addMedia(id, url , file.name ).then(()=>{}).catch(()=>{})
                })
            })
        })

    }

    const uploadHandleChange = async ({ fileList }: any) => {
        const newFiles = fileList.map( ({ originFileObj }: any) => originFileObj);
    
        setState({ fileList: newFiles });
        
        
        setFiles(newFiles)
    };

    const { previewVisible, previewImage } = state;
    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <>
            <p>Your images must be atleast 500 x 500 pixels with a maximum of 2000 x 2000 pixels. Individual images have a 2mb size limit.</p>
            <Container>
            <div className="clearfix">

                <Upload
                    beforeUpload={beforeUpload}
                    listType="picture-card"
                    onPreview={handlePreview}
                    onChange={uploadHandleChange}
                    
                
                >
                    {files.length >= 4 ? null : uploadButton}
                </Upload>

                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>

          {/*  <Button*/}
          {/*  type="primary"*/}
          {/*  onClick={handleUpload}*/}
          {/*  disabled={state.fileList.length === 0}*/}
          {/*  loading={isPending}*/}
          {/*  style={{ marginTop: 16 }}*/}
          {/*>*/}
          {/*  {state.uploading ? 'Uploading' : 'Start Upload'}*/}
          {/*</Button>*/}

            <Action>
                <Button onClick={()=>callback("3")}> Back </Button>
                <Button loading={isPending} onClick={handleUpload} type="primary"> Preview </Button>
            </Action>
            </Container>
        </>
    );
};

export default Image;

