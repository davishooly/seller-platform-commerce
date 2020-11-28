import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin, Icon, notification } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'redux-query-react';

import { activateSellerAccount } from '../../api/src/apis';

const ActivationContainer = styled.div`
    display: grid;
    place-items: center;
    height: 600px;
    span {
        text-align: center;
    }
`;

const sendInvitation = (userId: string, token: string) => {
    return activateSellerAccount({
        data: {
            uid: userId,
            token: token,
        },
    });
};

const ActivationPage: React.FC = (props: any) => {
    const {
        match: {
            params: { userId, token },
        },
    } = props;

    const history = useHistory();

    const [{ isPending, isFinished, status }, createInvitation] = useMutation(() => sendInvitation(userId, token));

    useEffect(() => {
        createInvitation();
    }, [userId, createInvitation]);

    const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin={isPending} />;

    if (isFinished && status === 200) {
        notification.success({
            message: 'Success',
            description: 'Your seller account has been activated login to access your seller portal',
        });

        history.push('/login');
    }

    return (
        <ActivationContainer>
            <span> Validating your account... </span>
            <Spin indicator={antIcon} />
        </ActivationContainer>
    );
};

export default ActivationPage;
