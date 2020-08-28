import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import axios from "axios"

import { UserContext } from '../../global/contexts'
import UserInterface from "../../models/UserInterface"

// UserList
const dummyDatas = [
    {
        id: 1,
        name: "Zidane",
        email: "zidane@mognet.com",
    },
    {
        id: 2,
        name: "Garnet",
        email: "garnet@mognet.com",
    },
    {
        id: 3,
        name: "Vivi",
        email: "vivi@mognet.com",
    },
    {
        id: 4,
        name: "Eiko",
        email: "eiko@mognet.com",
    },
];

// Q.未ログインユーザーにはUserの表のカラムを出さないようにしたい
// Q.Follow自体の機能と、ボタンをクリックしたらフォローするようにしたい
const UserList = () => {
    const { user, isLogin } = useContext(UserContext);
    const [users, setUsers] = useState<UserInterface[]>([])
    const [following, setFollowing] = useState<number[]>([])
    const [followed, setFollowed] = useState<number[]>([])

    const fetchUsers = () => {
        axios.get('http://localhost:3001/users')
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log(err))
    }

    const fetchDetail = (id:number) => {
        axios.get(`http://localhost:3001/users/detail/${id}`)
        .then(res => {
            console.log(res)
            setFollowing(res.data.following)
            setFollowed(res.data.followers)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchUsers()
        if (isLogin) fetchDetail(user.id)
    }, [])

    if (users !== null && users.length !== 0) {
        return (
            <div>
                {
                    users.map((data:UserInterface, index:number) => {
                        if (user.id === data.id) return
                        const isFollowing = following.includes(data.id)
                        const isFollowee = followed.includes(data.id)
                        return(
                            <User
                                key={`User.${index}`}
                                name={data.name}
                                isFollowing={isFollowing}
                                isFollowee={isFollowee}
                            />
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div>
                {
                    dummyDatas.map((data:UserInterface, index:number) => {
                        return(
                            <User
                                key={`User.${index}`}
                                name={data.name}
                                isFollowing={false}
                                isFollowee={false}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

// User
const Wrapper = styled.div`
  margin: 3vh auto;
  width: 80%;
`;
const Row = styled.div`
  margin: 0.2vh 0;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;
const Icon = styled.div`
  width: 5%;
  height: 3vh;
  border-radius: 6vw;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NameLabel = styled.div`
  width: 40%
`;
const NowFollowStatus = styled.div`
  width: 20%;
  height: 3vh;
  border-radius: 6vw;
  color: white;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NowFollowBackStatus = styled.div`
  width: 20%;
  height: 3vh;
  border-radius: 6vw;
  color: white;
  background-color: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NotFollowStatus = styled.div`
  width: 20%;
  height: 3vh;
  border-radius: 6vw;
  color: skyblue;
  border: 1px solid skyblue;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NotFollowBackStatus = styled.div`
  width: 20%;
  height: 3vh;
  border-radius: 6vw;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomLine = styled.hr`
  width: 85%;
  height: 1vh;
  border: none;
  border-top: 0.05rem solid #646464;
`;
const LinkTitle = styled.div`
  width: 10%;
  text-align: center;
  font-weight: bold;
`;
const LinkIcon = styled.div`
  width: 5%;
  color: #646464;
`;
interface UserInterfaceForListDisplay {
    name: string
    isFollowing: boolean
    isFollowee: boolean
}
const User = (prop: UserInterfaceForListDisplay) => {
  const FollowStatus = prop.isFollowing
      ? <NowFollowStatus>Following</NowFollowStatus>
      : <NotFollowStatus>Follow Now?</NotFollowStatus>

  const FollowBackStatus = prop.isFollowee
      ? <NowFollowBackStatus>Followee Now!</NowFollowBackStatus>
      : <NotFollowBackStatus>No Followee...</NotFollowBackStatus>

  return (
    <Wrapper>
        <Row>
          <Icon>{prop.name.charAt(0)}</Icon>
          <NameLabel>{prop.name}</NameLabel>
          {FollowStatus}
          {FollowBackStatus}
        </Row>
        <Row>
            <BottomLine/>
            <LinkTitle>Read More</LinkTitle>
            <LinkIcon>></LinkIcon>
        </Row>
    </Wrapper>
  )
}

// UserIndex
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
`;

const UserIndex = () => {
    return (
        <TopWrapper>
            <Header>
                <Title>Users</Title>
            </Header>
            <Body>
                <UserList/>
            </Body>
        </TopWrapper>
    );
}
export default UserIndex