// components/MessageSidebar.js
const MessageSidebar = () => {
    const options = [
      { label: 'Compose', icon: '✏️' },
      { label: 'Inbox', icon: '📥' },
      { label: 'Starred', icon: '⭐' },
      { label: 'Spam', icon: '🚫' },
      { label: 'Draft', icon: '📝' },
      { label: 'Important', icon: '⚠️' },
    ];
  
    return (
      <div className="flex flex-col bg-white shadow-md rounded-lg p-4 h-full">
        {options.map((option) => (
          <div
            key={option.label}
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded"
          >
            <span className="mr-2">{option.icon}</span>
            <span className="font-medium">{option.label}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSidebar;