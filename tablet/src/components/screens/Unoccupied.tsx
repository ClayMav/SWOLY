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
        reserved
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

  // console.log(data.gym.stations[0])

  if (data && data.gym.stations[1].reserved === true) {
    return <Redirect to="/occupied" />;
  }

  function occupyStation() {
    return <Redirect to="/occupied" />
  }
  return (
    <Layout>
      <Content>
        <img 
        src = 'https://bit.ly/2rPCE7I'
        width = '100%'
        />
      </Content>
      {/* <Footer>
        <Button onClick={occupyStation}>Occupy</Button>
      </Footer> */}
    </Layout>

  );
}
