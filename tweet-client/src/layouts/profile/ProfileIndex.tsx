import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"

import { UserContext } from '../../global/contexts'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const IconArea = styled.div`
  margin: 0 2.5%;
  width: 20vh;
  height: 20vh;
  border-radius: 10vh;
  background: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);
  box-shadow: 4px 4px lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 4.0rem;
  font-weight: bold;
`;
const ContentArea = styled.div`
  margin: 0 2.5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  white-space: nowrap;
`;
const NameArea = styled.div`
  margin: 2% 0;
  color: gray;
  font-size: 2.0rem;
  font-weight: bold;
`;
const CommonArea = styled.div`
  margin: 2% 0;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;
const Label = styled.div`
  margin: 0 2%;
  text-decoration: underline;
`;
const Value = styled.div`
  margin: 0 2%;
`;
const FollowArea = styled.div`
  margin: 0 1vw;
  padding: 0 2.5vw;
  background: linear-gradient(to right, #c9d6ff, #e2e2e2);
  border-radius: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const FollowLabel = styled.div`
  margin: 1% 0;
  text-align: center;
`;
const FollowValue = styled.div`
  margin: 1% 0;
  font-weight: bold;
  text-align: center;
`;
interface ProfileInterface {
  name: string
  email: string,
  description: string,
  following_count: number,
  follower_count: number,
  portfolio_url: string,
  facebook_url: string,
  instagram_url: string,
}
const Profile = (prop:ProfileInterface) => {
    console.log(prop)
    const PortfolioUrlArea = (prop.portfolio_url === undefined || prop.portfolio_url === "") ? null : (
      <CommonArea>
        <Label>Portfolio</Label>
        <Value>{prop.portfolio_url}</Value>
      </CommonArea>
    )
    const FaceBookUrlArea = (prop.facebook_url === undefined || prop.facebook_url === "") ? null : (
       <CommonArea>
        <Label>Facebook</Label>
        <Value>{prop.facebook_url}</Value>
      </CommonArea>
    )
    const InstagramUrlArea = (prop.instagram_url !== undefined || prop.instagram_url !== "") ? null : (
      <CommonArea>
        <Label>Instagram</Label>
        <Value>{prop.instagram_url}</Value>
      </CommonArea>
    )

    return (
        <Wrapper>
            <IconArea>{prop.name.charAt(0)}</IconArea>
            <ContentArea>
                <NameArea>{prop.name}</NameArea>
                <CommonArea>
                    <Label>EMAIL</Label>
                    <Value>{prop.email}</Value>
                </CommonArea>
                <CommonArea>
                    <Label>DESCRIPTION</Label>
                    <Value>{prop.description}</Value>
                </CommonArea>
                <CommonArea>
                    <FollowArea>
                        <FollowLabel>Followers</FollowLabel>
                        <FollowValue>{prop.follower_count}</FollowValue>
                    </FollowArea>
                    <FollowArea>
                        <FollowLabel>Followees</FollowLabel>
                        <FollowValue>{prop.following_count}</FollowValue>
                    </FollowArea>
                </CommonArea>
                {PortfolioUrlArea}
                {FaceBookUrlArea}
                {InstagramUrlArea}
            </ContentArea>
        </Wrapper>
    )
}

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  color: #646464;
  font-size: 3.0rem;
`;
const Body = styled.div`
  width: 100%;
  height: 75%;
`;

const dummyData = {
    name: "Moguo",
    email: "moguo@mognet.com",
    description: "Hello Dummy, Hello Moguo!",
    following_count: 50,
    follower_count: 280,
    portfolio_url: "http://moguo.portfolio.com",
    facebook_url: "http://www.facebook.com/moguo",
    instagram_url: "http://www.instagram.com/moguo",
}
  
const ProfileIndex = () => {
    const { user, isLogin } = useContext(UserContext);
    const [data, setData] = useState<ProfileInterface|undefined>(undefined)

    const fetchDetail = (id:number) => {
        axios.get(`http://localhost:3001/users/detail/${id}`)
        .then(res => {
            console.log(res)
            setData({
                name: res.data.name,
                email: res.data.email,
                description: res.data.description,
                following_count: res.data.following.length,
                follower_count: res.data.followers.length,
                portfolio_url: res.data.urls.portfolio,
                facebook_url: res.data.urls.facebook,
                instagram_url: res.data.urls.instagram,
            })
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if (isLogin) fetchDetail(user.id)
    }, [])

    const content = data !== undefined
        ? <Profile
            name={data.name}
            email={data.email}
            description={data.description}
            following_count={data.following_count}
            follower_count={data.follower_count}
            portfolio_url={data.portfolio_url}
            facebook_url={data.facebook_url}
            instagram_url={data.instagram_url}
          />
        : <Profile
            name={dummyData.name}
            email={dummyData.email}
            description={dummyData.description}
            following_count={dummyData.following_count}
            follower_count={dummyData.follower_count}
            portfolio_url={dummyData.portfolio_url}
            facebook_url={dummyData.facebook_url}
            instagram_url={dummyData.instagram_url}
          />

    return (
      <TopWrapper>
        <Header>
          <Title>Profile</Title>
        </Header>
        <Body>
          {content}
        </Body>
      </TopWrapper>
    )
}

export default ProfileIndex