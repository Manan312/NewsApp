import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  articles = [];
  static defaultProps = {
    country: "us",
    pageSize: 15,
    totalResults: 0,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      apiKey: "db1e47ec50e14b918a20cc37ae7956a9", //fd83ff3225a043eba5ac73cf8777fcff
    };
    document.title = `News Bytes - ${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    }`;
  }
  // async updatePageDetails() {
  //   try {
  //     let url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&country=${this.props.country}&sortBy=publishedAt&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //       articles:
  //         this.state.page === 1
  //           ? parsedData.articles
  //           : this.state.articles.concat(parsedData.articles),
  //       totalResults: parsedData.totalResults ? parsedData.totalResults : 0,
  //       loading: false,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching news articles:", error);
  //   }
  // }

  async updatePageDetails() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&country=${this.props.country}&sortBy=publishedAt&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles:
          this.state.page === 1
            ? parsedData.articles || []
            : this.state.articles.concat(parsedData.articles || []),
        totalResults: parsedData.totalResults || 0,
      });
    } catch (error) {
      console.error("Error fetching news articles:", error);
    }
  }

  async componentDidMount() {
    try {
      // let url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&country=${this.props.country}&sortBy=publishedAt&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({ loading: true });
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // this.setState({
      //   articles: parsedData.articles,
      //   totalResults: parsedData.totalResults ? parsedData.totalResults : 0,
      //   loading: false,
      // });
      this.updatePageDetails();
    } catch (error) {
      console.error("Error fetching news articles:", error);
    }
  }
  fetchMoreData = async () => {
    try {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        async () => {
          let url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&country=${this.props.country}&sortBy=publishedAt&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

          let data = await fetch(url);
          let parsedData = await data.json();

          this.setState((prevState) => ({
            articles: prevState.articles.concat(parsedData.articles || []),
            totalResults: parsedData.totalResults || 0,
          }));
        }
      );
      // console.log(this.state.articles.length);
      // console.log(this.state.totalResults);
      // console.log(this.state.totalResults / this.state.articles.length);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  // handlePrevClick = async () => {
  //   try {
  //     // let url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&country=${this.props.country}&sortBy=publishedAt&apiKey=${this.state.apiKey}&page=${
  //     //   this.state.page - 1
  //     // }&pageSize=${this.props.pageSize}`;
  //     // this.setState({ loading: true });
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json();
  //     // this.setState({
  //     //   page: this.state.page - 1,
  //     //   articles: parsedData.articles,
  //     //   loading: false,
  //     // });
  //     this.setState({ page: this.state.page - 1 }, this.updatePageDetails);
  //   } catch (error) {
  //     console.error("Error fetching previous page:", error);
  //   }
  // };
  // handleNextClick = async () => {
  //   try {
  //     // let url = `https://newsapi.org/v2/top-headlines?language=en&category=${this.props.category}&country=${this.props.country}&sortBy=publishedAt&apiKey=${this.state.apiKey}&page=${
  //     //   this.state.page + 1
  //     // }&pageSize=${this.props.pageSize}`;
  //     // this.setState({ loading: true });
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json();
  //     // this.setState({});
  //     // this.setState({
  //     //   page: this.state.page + 1,
  //     //   articles: parsedData.articles,
  //     //   loading: false,
  //     // });
  //     this.setState({ page: this.state.page + 1 }, this.updatePageDetails);
  //   } catch (error) {
  //     console.error("Error fetching next page:", error);
  //   }
  // };
  render() {
    return (
      <>
        <h1 className="text-center">
          Latest News -{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={
            Math.floor(this.state.totalResults / this.state.articles.length) > 1
          }
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((article, index) => (
                <div className="col-md-4" key={article.url || index}>
                  <NewsItem
                    title={article?.title?.slice(0, 45) || ""}
                    description={
                      article?.description
                        ? article.description.slice(0, 80) + "..."
                        : ""
                    }
                    imageUrl={article?.urlToImage || ""}
                    newsUrl={article?.url || ""}
                    author={article?.author}
                    publishedAt={article?.publishedAt}
                    source={article?.source?.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="d-flex justify-content-between">
          <button
            className="btn btn-dark"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 12)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
