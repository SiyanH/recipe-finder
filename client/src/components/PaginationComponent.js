import React, {Component} from 'react';

class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getPageIndex();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentPage !== this.props.currentPage) {
            this.setState(this.getPageIndex());
        }
    }

    calPageIndex = (currPage, pageIndex, maxPage) => {
        // Last few pages
        if (maxPage - currPage === 2 && pageIndex === 1) {
            return [currPage, currPage + 1, currPage + 2];
        }
        if (maxPage - currPage === 1) {
            if (pageIndex === 1) {
                return [currPage, currPage + 1];
            }
            if (pageIndex === 2) {
                return [currPage - 1, currPage, currPage + 1];
            }
        }
        if (maxPage === currPage) {
            if (pageIndex === 3) {
                return [currPage - 2, currPage - 1, currPage];
            }
            if (pageIndex === 2) {
                return [currPage - 1, currPage];
            }
            if (pageIndex === 1) {
                return [currPage];
            }
        }

        // Normal pages
        let firstPage, secondPage, thirdPage, fourthPage;
        switch (pageIndex) {
            case 1:
                firstPage = currPage;
                secondPage = currPage + 1;
                thirdPage = currPage + 2;
                fourthPage = currPage + 3;
                break;
            case 2:
                firstPage = currPage - 1;
                secondPage = currPage;
                thirdPage = currPage + 1;
                fourthPage = currPage + 2;
                break;
            case 3:
                firstPage = currPage - 2;
                secondPage = currPage - 1;
                thirdPage = currPage;
                fourthPage = currPage + 1;
                break;
            case 0:
                firstPage = currPage - 3;
                secondPage = currPage - 2;
                thirdPage = currPage - 1;
                fourthPage = currPage;
                break;
            default:
                throw new Error("Page parse failed");
        }
        return [firstPage, secondPage, thirdPage, fourthPage]
    };

    // Page index starts from 1
    getPageIndex = () => {
        let currPage = this.props.currentPage;
        let pageIndex = currPage % 4;
        let maxPage = this.props.maxPage || 1;

        return ({
            maxPage: maxPage,
            currPage: currPage,
            pageIndex: pageIndex,
            pages: this.calPageIndex(currPage, pageIndex, maxPage)
        });
    };

    render() {
        return (
            <nav aria-label="Recipe search results">
                <ul className="pagination justify-content-center">
                    {
                        this.state.currPage === 1 &&
                        <li className="page-item disabled">
                            <span className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </span>
                        </li>
                    }
                    {
                        this.state.currPage > 1 &&
                        <li className="page-item">
                            <span className="page-link" aria-label="Previous"
                                  onClick={() => this.props.setPageNum(this.state.currPage - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </span>
                        </li>
                    }
                    {
                        this.state.pages.map(
                            page =>
                                <li className={`page-item ${this.state.currPage === page
                                                            ? 'active' : ''}`} key={page}>
                                    <span className="page-link"
                                          onClick={() => this.props.setPageNum(page)}>{page}
                                    </span>
                                </li>)
                    }
                    {
                        this.state.currPage < this.state.maxPage &&
                        <li className="page-item">
                        <span className="page-link" aria-label="Next"
                              onClick={() => this.props.setPageNum(this.state.currPage + 1)}>
                            <span aria-hidden="true">&raquo;</span>
                        </span>
                        </li>
                    }
                    {
                        this.state.currPage === this.state.maxPage &&
                        <li className="page-item disabled">
                            <span className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </span>
                        </li>
                    }
                </ul>
            </nav>
        )
    }
}

export default PaginationComponent;
