import React from 'react'
import "./News.css"
function NewsItem(props) {
	const p = props.item
	return (
		<div className='inneritem'>
			<h3>{p.title.rendered}</h3>
			<img src={p.jetpack_featured_media_url}/>
		</div>
	)
}

export default NewsItem
