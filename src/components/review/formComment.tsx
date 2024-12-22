"use client"
import { addComment } from "@/redux/Comment/commentSlice";
import {  useState } from "react";
import {  useDispatch } from "react-redux";
const FormComment = ({star}) => {
    const dispatch = useDispatch();
   
    const [comment, setComment] = useState(""); 
    const [name, setName] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [agreePolicy, setAgreePolicy] = useState(false);
    
     
   
  
    const handleSubmit = () => {
        if (comment.trim() && name.trim() && phone.trim()) {
          const commentData = {
            name,
            phone,
            comment,
            star
          };
    
          dispatch(addComment(commentData)) 
    
          // Reset lại các trường input sau khi submit
          setComment("");
          setName("");
          setPhone("");
          setAgreePolicy(false);
        } else {
          alert("Bạn cần nhập đủ thông tin!");
        }
      };
  return (
     <div className='w-full'>
             
              <div className="mb-4">
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Nhập bình luận của bạn tại đây..."
              value={comment}
              onChange={(e)=> setComment(e.target.value)}
            ></textarea>
          </div>
              

          <div className="flex gap-4 mb-4">
            <input
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Họ tên (bắt buộc)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Số điện thoại (bắt buộc)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>


          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={agreePolicy}
              onChange={() => setAgreePolicy(!agreePolicy)}
            />
            <span className="text-sm text-gray-600">
              Tôi đồng ý với{" "}
              <a href="#" className="text-blue-500 underline">
                Chính sách xử lý dữ liệu cá nhân
              </a>{" "}
              của Young Tech
            </span>
          </div>
        
             

   
          <div className="flex w-full justify-center">
            <button
            className={`px-4 py-2 rounded-md ${
              agreePolicy
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!agreePolicy}
            >
              Gửi đánh giá
            </button>
          </div>
     </div>
  )
}

export default FormComment
