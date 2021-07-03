import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import { getPosts } from "../../../actions/postActions";

import { PostContext } from "../../../contexts/PostContext"

import PostView from "../../posts/PostView"
import HomeCTA from "./HomeCTA"
import Slider from "../../common/Slider"

const Home = () => {

    // Configure required contexts.
    const { posts: _posts, dispatch } = useContext(PostContext)
    
    // Get posts.
    useEffect(() => {
        getPosts(dispatch)
        return () => dispatch({ type: 'CLEAR_POST' })
        
    }, [dispatch])

    // Map each post to a post view component.
    const posts = _posts.map(post => (
        <PostView key={post._id} post={post} />
    ))

    const cats = ['tech', 'politics', 'sports', 'fashion', 'health', 'covid-19', 'business']

    const categories = cats.map(cat => (
        <div className="cat">
            <Link to='/' className='txt-lg-md swatch-1 fw-800 cat-txt'><span className="red-txt">+</span> {cat} <span className="red-txt">+</span></Link>
        </div>
    ))

    return(
        <div className="home">
            <HomeCTA />

            <div className="home-section">
                <h1 className="title"><span className="fw-300">+ freshly </span><span className="red-txt">baked +</span></h1>
                {posts && <Slider content={posts} gap={50} perView={3} />}
            </div>
            
            <div className="home-section">
                <h1 className="title"><span className="fw-300">+ must </span><span className="red-txt">read +</span></h1>
                {posts && <Slider content={posts} gap={50} perView={3} />}
            </div>
            
            <div className="home-section">
                <h1 className="title">+ <span className="red-txt fw-300">categories</span> +</h1>
                {categories && <Slider content={categories} gap={50} perView={3}/>}
            </div>

            <div className="home-section">
                <h1 className="title"><span className="fw-300">+ must </span><span className="red-txt">read +</span></h1>
                {posts && <Slider content={posts} gap={50} perView={3} />}
            </div>
        </div>
    )
}

export default Home