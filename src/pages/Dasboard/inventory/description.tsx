import React, { useEffect, useState } from 'react';
import { convertToRaw } from 'draft-js';
import RichEditor from '../../../components/Input/editor';
import { Action } from './images';
import { Button, Collapse } from 'antd';
import { calculateScore } from 'utils/score';

const descriptionSet = new Set();

const Description = ({ onNext, callback, setScore, score }: any) => {
    const { Panel } = Collapse;
    const [productDescription, setDescription] = useState<any>({
        description: '',
        package: '',
        isFilled: false,
    });

    const [changeDescription, setChangeDescription] = useState('');

    useEffect(() => {
        if (changeDescription === 'description' && productDescription.description !== '') {
            const blocks = convertToRaw(productDescription.description?.getCurrentContent()).blocks;
            let blockedText = '';
            let totalLength = 0;
            blocks.forEach(({ text, inlineStyleRanges }) => {
                blockedText += text;
                totalLength += inlineStyleRanges.length;
            });
            setScore({ ...score, bold: totalLength > 10 ? 10 : totalLength });
            const scoreValue = calculateScore(blockedText, 'description');
            if (scoreValue) {
                setScore({
                    ...score,
                    description: 10,
                    bold: totalLength > 10 ? 10 : totalLength,
                });
            }
        }

        if (changeDescription === 'package' && productDescription.package !== '') {
            productDescription.description !== '' &&
                !productDescription.isFilled &&
                setDescription({ ...productDescription, isFilled: true });
            // the score for package is dependants on blocks
            // blocks are new lines of text
            const blocks = convertToRaw(productDescription.package.getCurrentContent()).blocks;
            if (blocks.length === 1 && blocks[0].text.length > 4) {
                setScore({
                    ...score,
                    packages: 5,
                });
            }
            if (blocks[0].text.length < 4) {
                setScore({
                    ...score,
                    packages: 0,
                });
            }
            if (blocks.length === 2 && blocks[1].text.length > 4) {
                setScore({
                    ...score,
                    packages: 10,
                });
            } else if (blocks.length === 2 && blocks[1].text.length < 4) {
                setScore({
                    ...score,
                    packages: 5,
                });
            }
        }
    }, [productDescription, score, changeDescription, setScore]);

    const submitProducts = () => {
        onNext({
            description:
                productDescription.description &&
                JSON.stringify(convertToRaw(productDescription.description.getCurrentContent())),
        });
        callback('5');
    };

    const onChange = (state: any, editor: any) => {
        setDescription({ ...productDescription, [`${editor}`]: state });
        setChangeDescription(editor);
        const { key, text } = convertToRaw(state.getCurrentContent()).blocks[0];
        if (text !== '') {
            descriptionSet.add(key);
        } else {
            descriptionSet.delete(key);
        }
    };

    return (
        <>
            <Collapse defaultActiveKey={['1']} bordered={false} expandIconPosition={'right'}>
                <Panel header={<h2>Product Description</h2>} key="1">
                    <div>
                        {
                            <RichEditor
                                placeholder="This is a text editor.  Add and edit as you wish."
                                editorType="description"
                                onChange={onChange}
                            />
                        }
                    </div>
                </Panel>

                <Panel header={<h2>What’s in the package?</h2>} key="2">
                    <div>
                        {
                            <RichEditor
                                placeholder="This is a text editor.  Add and edit as you wish."
                                editorType="package"
                                onChange={onChange}
                            />
                        }
                    </div>
                </Panel>
            </Collapse>

            <h2> </h2>

            <Action>
                <Button onClick={() => callback('3')}> Back </Button>
                <Button disabled={!productDescription.isFilled} type="primary" onClick={submitProducts}>
                    {' '}
                    Save and proceed{' '}
                </Button>
            </Action>
        </>
    );
};

export default Description;
