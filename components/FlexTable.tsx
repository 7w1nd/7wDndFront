import styled from "styled-components";
import React, { Component } from 'react';
import { FaSearch, FaUndo, FaEdit, FaFile, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Link from "next/link";
import ReactPaginate from 'react-paginate';

const Container = styled.div`
    width: fit-content;
    
    & .pagination {
        display: flex;
        list-style: none;
        height: 40px;
        border: 1px solid black;
        border-radius: 5px;
        width: fit-content;
        align-items: center;
        padding: 0;
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        li {
            padding: 1rem;
            a {
                display: flex;
                align-items: center;
                height: 100%;
                padding: 0 10px;
                cursor: pointer;
                text-decoration: none;
                
                &:hover {
                    background-color: #ccc;
                    border-radius: 3pt;
                }
            }
            &.active {
                a {
                    font-weight: bold;
                    pointer-events: none;
                    background-color: #ccc;
                    border-radius: 3pt;
                }
            }
        }
    }
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

const SearchField = styled.input`
    padding: 0.75rem;
    margin: 0.25rem;
    font-size: 20pt;
    width: 100%;
    width: -moz-available;          
    width: -webkit-fill-available; 
    width: fill-available;
    background: none !important;
    color: black;
    font-size: 16pt;
    border-radius: 3pt;
`;

let sortState = [];
let refs = [];
let currentPage = 0;
export default class FlexTable extends Component<any, any> {
    constructor(props) {
        super(props)
        const { headers, data, root, repo, perPage = 10 } = props
        this.state = {
            headers,
            rows: data.rows,
            pageCount: data.pageCount,
            perPage,
            root,
            repo
        }
        sortState = headers.map(() => 0);
        refs = headers.map(() => React.createRef());
    }

    orderData = (index) => {
        if (sortState[index] == 0) {
            sortState = sortState.map((_: any, i: any) => i == index ? 1 : 0);
        } else {
            sortState = sortState.map((_: any, i: string | number) => i == index ? sortState[i] == 1 ? -1 : 1 : 0);
        }
        this.getData(
            this.state.headers[index].name,
            sortState[index],
            refs.map((a, i) => a?.current?.value ? { name: this.state.headers[i].name, value: a?.current?.value } : null).filter(a => a),
            currentPage
        );
    };

    filterData = () => {
        const index = sortState.findIndex(a => a != 0);
        this.getData(
            index == -1 ? '' : this.state.headers[index].name,
            index == -1 ? '' : sortState[index],
            refs.map((a, i) => a?.current?.value ? { name: this.state.headers[i].name, value: a?.current?.value } : null).filter(a => a),
            currentPage
        );
    };

    clearFilters = () => {
        for (let index = 0; index < refs.length; index++) {
            const ref = refs[index];
            if (ref.current) {
                ref.current.value = '';
            }
        }
        sortState = this.state.headers.map(() => 0);
        currentPage = 0;
        this.getData('', '', [], 0);
    };

    getData = (orderName, orderDir, filters, page) => {
        this.state.repo.getAll(orderName, orderDir, filters, page, this.state.perPage)
            .catch(e => { console.log(e); return [] })
            .then(data => {
                this.setState({
                    rows: data.rows,
                    pageCount: data.pageCount
                });
            });
    }

    pagginationHandler = (page) => {
        currentPage = page.selected;
        this.filterData();
    };

    render() {
        const { headers, rows, root, pageCount } = this.state;

        return (
            <Container>
                {headers?.length
                    ? <Row>
                        {headers?.map((header, index) => header.width != 0
                            ? <Cell onClick={() => header.orderable ? this.orderData(index) : null} key={index} style={{ width: header.width }}>{header.title}
                                {header.orderable
                                    ? sortState[index] == 0
                                        ? <FaSort style={{ margin: '0px 0px -5px 5px' }} />
                                        : sortState[index] == 1
                                            ? <FaSortUp style={{ margin: '0px 0px -5px 5px' }} />
                                            : <FaSortDown style={{ margin: '0px 0px -5px 5px' }} />
                                    : null}
                            </Cell>
                            : null)}
                        <Cell style={{ width: '12rem' }}>Actions</Cell>
                    </Row>
                    : null}
                {headers?.length && headers.some(header => header.filterable)
                    ? <Row>
                        {headers?.map((header, index) => header.width != 0
                            ? header.filterable
                                ? <Cell key={index} style={{ width: header.width }}>
                                    <SearchField type="text" ref={refs[index]} name={header.name} placeholder={header.title} />
                                </Cell>
                                : <Cell key={index} style={{ width: header.width }}>
                                </Cell>
                            : null)}
                        <Cell style={{ width: '12rem' }}>
                            <IconButton type="button" onClick={() => this.filterData()}><FaSearch /></IconButton>
                            <IconButton type="button" onClick={() => this.clearFilters()}><FaUndo /></IconButton>
                        </Cell>
                    </Row>
                    : null}
                {rows?.map((row: any, index: number) =>
                    <Row key={index}>
                        {row?.map((field, index) => headers[index]?.width != 0 ? <Cell key={index} style={{ width: headers[index]?.width }}>{field}</Cell> : null)}
                        <Cell style={{ width: '12rem' }}>
                            <Link href={`/${root}/${row[0]}`} passHref>
                                <IconButton type="button"><FaFile /></IconButton>
                            </Link>
                            <Link href={`/${root}/edit/${row[0]}`} passHref>
                                <IconButton type="button"><FaEdit /></IconButton>
                            </Link>
                            <IconButton type="button"><FaTrash /></IconButton>
                        </Cell>
                    </Row>)}
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    activeClassName={'active'}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}

                    initialPage={0}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.pagginationHandler}
                />
            </Container>
        )
    }
}
