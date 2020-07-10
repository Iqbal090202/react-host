import React, { Component, Fragment } from 'react'
import './BlogPost.css'
import Post from '../../component/Post/Post'
import axios from 'axios'

class BlogPost extends Component {
    state = {
        post: [],
        formBlogPost: {
            userId: 1,
            id: 1,
            title: '',
            body: ''
        },
        isUpdate: false
    }

    getPostAPI = () => {
        // GET ES6
        // fetch('http://jsonplaceholder.typicode.com/posts')
        // .then(res => res.json())
        // .then(json => {
        //     this.setState({
        //         post: json
        //     })
        // })
        
        //GET AXIOS
        axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
        .then((res) => {
            this.setState({
                post: res.data
            })
        })
    }

    postDataAPI = () => {
        axios.post(`http://localhost:3004/posts/`, this.state.formBlogPost)
        .then((res) => {
            this.getPostAPI()
            this.setState({
                formBlogPost: {
                    userId: 1,
                    id: 1,
                    title: '',
                    body: ''
                },
            })
        }, (err) => {
            console.log('error: ', err)
        })
    }

    putDataAPI = (data) => {
        axios.put(`http://localhost:3004/posts/${this.state.formBlogPost.id}`, this.state.formBlogPost)
        .then((res) => {
            this.getPostAPI()
            this.setState({
                isUpdate: false,
                formBlogPost: {
                    userId: 1,
                    id: 1,
                    title: '',
                    body: ''
                },
            })
        }, (err) => {
            console.log('error: ', err)
        })
    }

    handleUpdate = (data) => {
        this.setState({
            formBlogPost: data,
            isUpdate: true
        })
    }
    
    handleRemove = (data) => {
        axios.delete(`http://localhost:3004/posts/${data}`)
        .then((res) => {
            this.getPostAPI()
        })
    }

    handleFormChange = (event) => {
        let newFormBlogPost = {...this.state.formBlogPost}
        let title = event.target.value
        let timestamp = new Date().getTime()
        if(!this.state.isUpdate) {
            newFormBlogPost['id'] = timestamp
        }
        newFormBlogPost[event.target.name] = title

        this.setState({
            formBlogPost: newFormBlogPost
        })
    }

    handleSubmit = () => {
        this.state.isUpdate === true ? this.putDataAPI() : this.postDataAPI() 
    }
    
    componentDidMount() {
        this.getPostAPI()
    }

    render() {
        return (
            <Fragment>
                <p className="section-title">Blog Post</p>
                <div className="form-add-post">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={this.state.formBlogPost.title} placeholder="add title" onChange={this.handleFormChange} />
                    <label htmlFor="body">Body</label>
                    <textarea name="body" value={this.state.formBlogPost.body} id="body" cols="30" rows="10" placeholder="add blog content" onChange={this.handleFormChange}></textarea>
                    <button className="btn-submit" onClick={this.handleSubmit}>Simpan</button>
                </div>
                {
                    this.state.post.map(post => {
                        return <Post key={post.id} data={post} remove={this.handleRemove} update={this.handleUpdate} />
                    })
                }
            </Fragment>
        );
    }
}

export default BlogPost