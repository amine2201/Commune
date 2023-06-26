import { Menu } from "@headlessui/react";
import { Notification, NotificationType } from "../Types/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/notifications')
      .then(response => response.json())
      .then(data => setNotifications(data));
  }, []);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-white rounded-md hover:bg-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <svg className="h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          {notifications.length > 0 && (
            <circle cx="16" cy="4" r="2" fill="red" />  // Add a red circle indicator for notifications
          )}
        </svg>
      </Menu.Button>
      <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="px-1 py-1 ">
          {notifications.map((notification)=>(<Menu.Item key={notification.id}>
            {({ active }) => (
              <Link
                to={notification.type== NotificationType.documentToSign? '/signer':'/CitizenDashboard'}
                className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} block px-4 py-2 text-sm`}
              >
                {notification.message}
              </Link>
            )}
          </Menu.Item>))}
   
        </div>
      </Menu.Items>
    </Menu>
  )
}

export default Notifications;
