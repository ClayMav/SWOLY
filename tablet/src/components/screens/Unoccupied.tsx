import React from "react";

import { Redirect } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Layout } from "antd";
import Button from 'antd/es/button';
const { Header, Content, Footer } = Layout;

const GET_MST_GYM = gql`
  {
    gym(id: "Ol0462y0TQTIv22TPAUA") {
      stations {
        occupiedBy {
          id
        }
      }
    }
  }
`;

export default function Unoccupied(this: any) {
  const { data } = useQuery(GET_MST_GYM, {
    pollInterval: 200
  });

  if (data) {
    console.log(data);
  }

  if (data && data.gym.stations[0].occupiedBy) {
    return <Redirect to="/occupied" />;
  }

  function occupyStation() {
    alert("The station is now occupied");
    return <Redirect to="/occupied" />
  }
  return (
    <Layout>
      <Header>
        <h1 style={{
          color: 'white'
        }}>Hello from the unoccupied view</h1>
      </Header>
      <Content>
      <h2>
        This is screen is for showing the user/gym that the current station is
        empty
      </h2>
      </Content>
      <Footer>
        <Button onClick={occupyStation}>Occupy</Button>
        </Footer>
    </Layout>

  );
}
