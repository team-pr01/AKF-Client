/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";
import { useGetAllPushNotificationForUserQuery } from "../../redux/Features/Auth/authApi";
import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import NotificationCard from "../../components/NotificationPage/NotificationCard/NotificationCard";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";

const Notification = () => {
  const user = useSelector(useCurrentUser) as any;
  console.log(user);
  const { data: allPushNotifications } = useGetAllPushNotificationForUserQuery(
    user?._id
  );

  // const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("new-push-notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
      // setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("new-push-notification");
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    if (allPushNotifications?.data) {
      // Merge backend notifications with real-time ones, newest first
      const combined = [...notifications, ...allPushNotifications.data];

      // Optional: Deduplicate if needed by filtering based on createdAt + message or _id
      const unique = Array.from(
        new Map(
          combined.map((n) => [n._id || n.createdAt + n.message, n])
        ).values()
      );

      // Sort descending by createdAt
      const sorted = unique.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setNotifications(sorted);
    }
  }, [allPushNotifications?.data]);

  return (
    <div>
      <PageHeader title={`Notifications `} />
      <div className="flex flex-col gap-4 mb-20 p-4">
        {allPushNotifications?.data.map((notification: any) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

export default Notification;
