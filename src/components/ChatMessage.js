import { auth } from "../firebase";

export const ChatMessage = (props) => {
    const { uid, text, photoURL, createdAt } = props.message;
    const time = new Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit'}).format(createdAt)
  
    const messageClass = uid === auth.currentUser.uid ? 'self-end bg-green-100' : 'bg-gray-100';
    return (
      <div className={`flex flex-col p-3 my-4 text-sm rounded-md drop-shadow-md w-1/2 ${messageClass}`}>
        <div className="flex items-center">      
          <img
              className="object-cover w-10 h-10 rounded-full"
              alt="User Avatar"
              src={photoURL}
            />
        <p className="ml-4">{text}</p>
        </div>
        <div className="ml-4 flex items-end justify-end">      
          <p className="text-xs">{time}</p>
      </div>
      </div>
    );
  }