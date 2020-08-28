import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../global/contexts';
import SnsLinks from '../components/drawer/SnsLinks';
import LinkButton from '../components/common/LinkButton';
import DrawerButton from '../components/common/DrawerButton';

interface MarginLinkButtonProp {
    label: string
    link_to: string
}
const MarginContainer = styled.div`
    margin: 0.5vh 0;
`;
const MarginLinkButton = (prop: MarginLinkButtonProp) => {
    return (
        <MarginContainer>
            <LinkButton label={prop.label} link_to={prop.link_to}/>
        </MarginContainer>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const Margin = styled.div`
    margin: 2vh 0;
`;
const Title = styled.div`
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 1.50rem;
`;
const SubTitle = styled.div`
    text-align: center;
    color: white;
`;
const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const UnauthenticatedMenu = () => {
    return (
        <Buttons>
            <MarginLinkButton label="Tweet" link_to="/tweet/list"/>
            <MarginLinkButton label="User" link_to="/user/list"/>
            <MarginLinkButton label="Sign In" link_to="/sign_in"/>
            <MarginLinkButton label="Sign Up" link_to="/sign_up"/>
            <MarginLinkButton label="About" link_to="/about"/>
        </Buttons>
    )
}

interface AuthenticatedMenuProp {
    onClick: () => void
}
const AuthenticatedMenu = (prop: AuthenticatedMenuProp) => {
    return (
        <div>
            <Buttons>
                <MarginLinkButton label="Tweet" link_to="/tweet/list"/>
                <MarginLinkButton label="User" link_to="/user/list"/>
                <MarginLinkButton label="Profile" link_to="/profile"/>
                <DrawerButton label="Logout" onClick={prop.onClick}/>
                <MarginLinkButton label="About" link_to="/about"/>
            </Buttons>
        </div>
    )
}

const UserInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;
const NameLabel = styled.div`
    margin 0 1vw;
    font-size: 0.75rem;
`;
const NameValue = styled.div`
    margin 0 1vw;
    font-weight: bold;
`;
interface UserInfoProp {
    name: string
}
const UserInfo = (prop: UserInfoProp) => {
    return (
        <UserInfoWrapper>
            <NameLabel>NAME</NameLabel>
            <NameValue>{prop.name}</NameValue>
        </UserInfoWrapper>
    )
}

const sessionKey = 'tweet-app-session-key'
const Drawer = () => {
    const { isLogin, setIsLogin, user, setUser } = useContext(UserContext);
    let history = useHistory();

    const logout = () => {
        setIsLogin(false)
        setUser({ id: 0, email: "", name: "" })
        window.sessionStorage.removeItem(sessionKey)
        history.push("/home");
    }

    const Menus = () => {
        return isLogin ? (
            <div>
                <Margin>
                    <UserInfo name={user.name}/>
                </Margin>
                <Margin>
                    <AuthenticatedMenu onClick={logout}/>
                </Margin>
            </div>
        ) : (<UnauthenticatedMenu/>)
    }

    return (
        <Wrapper>
            <Margin>
                <Title>Tweet App</Title>
                <SubTitle>With saving your private...</SubTitle>
            </Margin>
            <Margin>
                <Menus/>
            </Margin>
            <Margin>
                <SnsLinks/>
            </Margin>
        </Wrapper>
    );
}

export default Drawer;
