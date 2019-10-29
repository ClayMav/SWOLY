import React from 'react'
import { Card, Col, Row, Statistic, Icon, List, Collapse } from 'antd';
import './App.css';
import data from "./data.json"
import { useParams } from 'react-router';
import { listenerCount } from 'cluster';

function dash() 
{
    const stations: any[] = data.stations;
    const users: any[] = data.users;
    
    let num_users = users.length;
    //let capacity = getCapacity(stations);

    return ( 
        <div className="Dash">
            <header className="App-header">
                Admin Dashboard
            </header>
        <body className="App">
            <div>
                <h2 className="header">Activity</h2>
            
            <Card size="small" >
                <Statistic
                    title="Active Users:"
                    value={num_users}
                />
                {/* <br/> */}
                {/* <Statistic
                    title="Peak Busy:"
                    value="8:00pm"
                /> */}
                <br />
                <Statistic
                    title="Machines Active:"
                    value={getCapacity(stations)}
                    precision={2}
                    suffix="%"
                    // valueStyle={{ color: '#cf1322' }}
                    // prefix={<Icon type="arrow-down" />}
                />
            </Card>
                </div>

            <div>
                <h2>Stations</h2>
            
            <List
                grid={{ gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={data.stations}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.name}>
                            <Statistic
                                title="Status:"
                                value={getStatus(item.occupied)[0]}
                                // valueStyle={{ color: {getStatus(item.occupied)[1]} }}
                            />
                        </Card>
                    </List.Item>
                )}
            />
                </div>
            </body>
        </div>
    )
}

function getStatus(occupied:boolean) 
{
    if (occupied) {
        return ["Occupied", '#3f8600'];
    }    
    else
        return ["Open", '#cf1322'];
}

function getCapacity(stations:any)
{
    let active = 0;
    let capacity = 0;

    for(var i=0; i<stations.length; i++)
    {
        if (stations[i].occupied) {
            active++;
        }
    if(stations.length > 0)
        capacity = (active/stations.length)*100;
    
    // if(capacity > 80)
    //     return [capacity, '#3f8600'];
    // else if (capacity < 80 && capacity > 30)
    //     return [capacity, '#cf1322'];
    return capacity;
    }
}

function getAvgWorkout()
{

}

function getAvgMembership(users:any)
{
    var avgmembership = 0;
    var curmembership = 0;
    var curDate = Date.now();

    for (var i = 0; i < users.length; i++)
    {
        curmembership = Math.abs(users[i].dateJoined-curDate);
        avgmembership += curmembership;
    }
    
    if(users.length >0)
    {
        avgmembership = avgmembership/users.length;
    }

    return avgmembership;
}
    
export default dash;