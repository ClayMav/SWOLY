import React from 'react'
import { Card, Col, Row, Statistic, Icon } from 'antd';
import './App.css';

function dash() 
{
    console.log("Yo fam")
    return (
        <div className="Dash">
            <header className="App-header">
                Admin Dashboard
      </header>
            <body>
                <Col span={16}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card size="small" title="Machine 1">
                                <Statistic
                                    title="Status:"
                                    value="Live"
                                    valueStyle={{ color: '#3f8600' }}
                                />
                                <Statistic
                                    title="Active User:"
                                    value="None"
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card size="small" title="Machine 2">
                                <Statistic
                                    title="Status:"
                                    value="Live"
                                    valueStyle={{ color: '#3f8600' }}
                                />
                                <Statistic
                                    title="Active User:"
                                    value="None"
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card size="small" title="Machine 3">
                                <Statistic
                                    title="Status:"
                                    value="Live"
                                    valueStyle={{ color: '#3f8600' }}
                                />
                                <Statistic
                                    title="Active User:"
                                    value="None"
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card size="small" title="Machine 4">
                                <Statistic
                                    title="Status:"
                                    value="Live"
                                    valueStyle={{ color: '#3f8600' }}
                                />
                                <Statistic
                                    title="Active User:"
                                    value="None"
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card size="small" title="Machine 5">
                                <Statistic
                                    title="Status:"
                                    value="Live"
                                    valueStyle={{ color: '#3f8600' }}
                                />
                                <Statistic
                                    title="Active User:"
                                    value="None"
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card size="small" title="Machine 6">
                                <Statistic
                                    title="Status:"
                                    value="Live"
                                    valueStyle={{ color: '#3f8600' }}
                                />
                                <Statistic
                                    title="Active User:"
                                    value="None"
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Card size="small" title="Stats">
                        <Statistic
                            title="Active Users:"
                            value={3}
                        />
                        <Statistic
                            title="Peak Busy:"
                            value="8:00pm"
                        />
                        <Statistic
                            title="Machines Active:"
                            value={0}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<Icon type="arrow-down" />}
                        />
                    </Card>
                </Col>

            </body>
        </div>
    )
}

export default dash;