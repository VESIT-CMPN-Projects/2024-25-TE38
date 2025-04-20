// import SignUpForm from "@/components/own/Form/SignUpForm";
import Vector from "../assets/MobileLogin.svg";
import MessageList from "@/components/own/Dashboard/MessageList";
import MessageSidebar from "@/components/own/Dashboard/MessageSidebar";
const SignUp = () => {
  return (
    <div className="h-full mt-20 flex">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed h-full p-4">
        <MessageSidebar />
      </div>
      {/* Message List */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <MessageList />
      </div>
    </div>
  );
};

export default SignUp;
