import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import "./News.css"
function LoadNews() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://telugunewsadda.com/wp-json/wp/v2/posts?_fields=id,title,content,slug,jetpack_featured_media_url&per_page=10');
        const json = await response.json();
        setData(json);
				
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div className='newsgrid'>
          {data.map((item) => (
            <div key={item.id} className='item'>
							<NewsItem item={item}/>
						</div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LoadNews;
