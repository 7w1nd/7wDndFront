import styled from "styled-components";
import React, { Component } from 'react';
import { FaEdit, FaFile, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Link from "next/link";

const Container = styled.div`
    width: fit-content;
`;

const Cell = styled.div`
    border: 1px solid #ccc;
    padding: 1rem;
`;

const Row = styled.div`
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1rem;
    
    &:nth-of-type(odd) {
        background-color: #959595;
    }
    
    &:first-of-type {
        border-bottom: 1px solid #f3f3f3;
        background-color: #fff0;
        font-size: 22pt;
        font-weight: bold;
    }
`;

const IconButton = styled.button`
    padding: 0.75rem;
    margin: 0.25rem;
    font-size: 20pt;
`;

export default class FlexTable extends Component<any, any> {
    constructor(props) {
        super(props)
        const { header, rows } = props
        this.state = {
            header,
            rows,
            sort: header.map(() => 0)
        }
    }

    orderData = (index) => {
        switch (this.state.sort[index]) { }
        if (this.state.sort[index] == 0) {
            this.setState({ sort: this.state.sort.map((_: any, i: any) => i == index ? 1 : 0) })
        } else {
            this.setState({ sort: this.state.sort.map((_: any, i: string | number) => i == index ? this.state.sort[i] == 1 ? -1 : 1 : 0) })
        }
        this.setState({
            rows: this.state.rows
                .sort((a, b) => {
                    if (a[index] > b[index]) {
                        return this.state.sort[index] == 1 ? -1 : 1;
                    }
                    if (b[index] > a[index]) {
                        return this.state.sort[index] == 1 ? 1 : -1;
                    }
                    return 0;
                })
        });
        console.log(index, this.state);
    };

    render() {
        const { header, rows, sort } = this.state;
        return (
            <Container>
                {header?.length ? <Row>
                    {header?.map((field, index) => field.width != 0 ?
                        <Cell onClick={() => field.orderable ? this.orderData(index) : null} key={index} style={{ width: field.width }}>{field.name}
                            {field.orderable
                                ? sort[index] == 0
                                    ? <FaSort style={{ margin: '0px 0px -5px 5px' }} />
                                    : sort[index] == 1
                                        ? <FaSortUp style={{ margin: '0px 0px -5px 5px' }} />
                                        : <FaSortDown style={{ margin: '0px 0px -5px 5px' }} />
                                : null}
                        </Cell> : null)}
                    <Cell style={{ width: '12rem' }}>Actions</Cell>
                </Row> : null}
                {rows?.map((row, index) =>
                    <Row key={index}>
                        {row.map((field, index) => header[index]?.width != 0 ? <Cell key={index} style={{ width: header[index]?.width }}>{field}</Cell> : null)}
                        <Cell style={{ width: '12rem' }}>
                            <Link href={`/characters/${row[0]}`} passHref>
                                <IconButton type="button"><FaFile /></IconButton>
                            </Link>
                            <Link href={`/characters/${row[0]}/edit/`} passHref>
                                <IconButton type="button"><FaEdit /></IconButton>
                            </Link>
                            <IconButton type="button"><FaTrash /></IconButton>
                        </Cell>
                    </Row>)}
            </Container>
        )
    }
}
