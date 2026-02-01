import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsData from "./NewsData";

const News = (props) => {
  const { country, category } = props;

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const apiKey = "5f7e0f80d0cd4136adb1f60f1c024912"
  const newsobject = NewsData()
  console.log(newsobject)

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // 🔹 Fetch initial news
  const fetchNews = async () => {
    try {
      setLoading(true);

      //const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=1&pageSize=9`;

      //const response = await fetch(url);
      const parsedData = newsobject;

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  // 🔹 Load more data (Infinite Scroll)
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      setPage(nextPage);

      //const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=9`;

     // const response = await fetch(url);
      const parsedData = newsobject;

      setArticles((prevArticles) =>
        prevArticles.concat(parsedData.articles || [])
      );
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  // 🔹 On mount + category change
  useEffect(() => {
    console.log()
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    setPage(1);
    fetchNews();
    // eslint-disable-next-line
  }, [category, country]);

  return (
    <>
      <h1 className="text-center">
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// 🔹 Default Props
News.defaultProps = {
  country: "us",
  category: "general",
};

// 🔹 Prop Types
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
