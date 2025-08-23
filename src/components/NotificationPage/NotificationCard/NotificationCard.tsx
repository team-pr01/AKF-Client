import React from "react";
import {
  CheckCircle,
  XCircle,
  Circle,
  Loader2,
  Phone,
  Calendar,
  User,
  LocateFixed,
} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

export type TPushNotification = {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: {
    location?: string;
    userName?: string;
    status?: "resolved" | "rejected" | "pending" | "processing";
    phoneNumber?: string;
  };
};

type NotificationCardProps = {
  notification: TPushNotification;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex relative p-4 rounded-lg transition-colors ${
        notification.read
          ? theme === "light"
            ? "bg-white"
            : "bg-dark-surface-alt hover:bg-gray-700/70"
          : theme === "light"
          ? "bg-gray-100"
          : "bg-dark-surface-alt hover:bg-gray-700/70-alt"
      }`}
    >
      {/* Type indicator (left bar, optional color logic) */}
      <div className="absolute left-0 top-0 bottom-0 w-1" />

      {/* Content */}
      <div className="flex-1">
        <p
          className={`text-sm ${
            !notification.read ? "font-bold" : "font-medium"
          } ${
            theme === "light" ? "text-gray-800" : "text-dark-text-primary"
          }`}
        >
          {notification.message}
        </p>

        <p
          className={`text-xs mt-1 line-clamp-2 ${
            theme === "light" ? "text-gray-500" : "text-dark-text-secondary"
          }`}
        >
          {notification.message}
        </p>

        {notification.data?.location && (
          <div
            className={`flex items-center gap-1 mt-1 text-xs ${
              theme === "light" ? "text-gray-500" : "text-dark-text-secondary"
            }`}
          >
            <LocateFixed size={14} />
            <span>{notification.data.location}</span>
          </div>
        )}

        <div
          className={`flex flex-wrap items-center gap-3 mt-2 text-xs ${
            theme === "light" ? "text-gray-500" : "text-dark-text-secondary"
          }`}
        >
          {/* User */}
          {notification.data?.userName && (
            <div className="flex items-center gap-1">
              <User size={12} />
              <span>{notification.data?.userName || "N/A"}</span>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>
              {new Date(notification.createdAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1">
            {notification.data?.status === "resolved" && (
              <CheckCircle size={12} className="text-green-500" />
            )}
            {notification.data?.status === "rejected" && (
              <XCircle size={12} className="text-red-500" />
            )}
            {notification.data?.status === "pending" && (
              <Circle size={12} className="text-orange-500" />
            )}
            {notification.data?.status === "processing" && (
              <Loader2 size={12} className="text-blue-500 animate-spin" />
            )}
            <span>{notification.data?.status}</span>
          </div>

          {/* Phone */}
          {notification.data?.phoneNumber && (
            <a
              href={`tel:${notification.data.phoneNumber}`}
              className="flex items-center gap-1"
            >
              <Phone size={12} />
              <span>{notification.data.phoneNumber}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
