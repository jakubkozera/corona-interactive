import React from 'react'
import './CountryArticle.css'
export default function CountryArticle({ article }) {
    return (
        <a className="country-article block" href={article.url}>
            <div classMain="article-content">
                <h4>{article.topic}</h4>
                <span>{article.description}</span>

            </div>
            <img className="article-img" alt={article.topic} src={article.imgUrl} />
        </a>
    )
}
