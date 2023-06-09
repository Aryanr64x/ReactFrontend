import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../BASE_URL";
import Comments from "../components/Comments";
import CreateComment from "../components/CreateComment";
import Navbar from "../components/Navbar";
import SinglePost from "../components/SinglePost";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const SoloPost = () => {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [showCreateComment, setShowCreateComment] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {

    try {
      const resp = await axios.get(BASE_URL + '/post/' + id)
      setPost(resp.data.post)
      setComments(resp.data.comments)

    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div>
      <Navbar />

      {
        (post) ? (<div className="mx-12">
          <SinglePost post={post} fromHomePage={false} />
        </div>) : (<div>Loading Post</div>)
      }
      {
        (!showCreateComment) ? (<button onClick={() => { setShowCreateComment(true) }} className="ml-12 text-white px-4 py-2 mt-4 text-lg font-semibold rounded-full bg-primary hover:scale-105 transition-all duration-200">
          Add Comment
        </button>) : (<span></span>)
      }
      {
        (showCreateComment) ? (<CreateComment post_id={post._id} newComment={(com) => {
          setComments([com, ...comments])
        }} />) : (<div></div>)
      }

      <Comments coms={comments} />
      <ToastContainer theme="colored" />

    </div>
  )

}






export default SoloPost;