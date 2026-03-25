"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/components/ui/Toast";

const _sb = createClient();

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "order":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      );
    case "promotion":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
        />
      );
    case "review":
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      );
    default:
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        />
      );
  }
}

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Az once";
  if (minutes < 60) return `${minutes} dk once`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} saat once`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} gun once`;
  if (days < 30) return `${Math.floor(days / 7)} hafta once`;
  return `${Math.floor(days / 30)} ay once`;
}

function NotificationsSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-neutral-100 animate-pulse"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 bg-neutral-100 rounded" />
            <div className="h-3 w-2/3 bg-neutral-100 rounded" />
            <div className="h-3 w-20 bg-neutral-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      const {
        data: { user },
      } = await _sb.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await _sb
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setNotifications(data as Notification[]);
      }
      setLoading(false);
    }
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await _sb
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (!error) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => !n.is_read).map((n) => n.id);
    if (unreadIds.length === 0) return;

    const { error } = await _sb
      .from("notifications")
      .update({ is_read: true })
      .in("id", unreadIds);

    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      showToast("Tum bildirimler okundu olarak isaretlendi", "success");
    } else {
      showToast("Bir hata olustu", "error");
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-neutral-900">
            Bildirimler
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-neutral-400 mt-1">
              {unreadCount} okunmamis bildirim
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Tumunu Okundu Isaretle
          </button>
        )}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-align-sm overflow-hidden">
        {loading ? (
          <div className="p-5">
            <NotificationsSkeleton />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <svg
              className="w-20 h-20 text-neutral-200 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Bildirim yok
            </h3>
            <p className="text-sm text-neutral-400 text-center">
              Henuz hicbir bildiriminiz bulunmuyor.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => {
                  if (!notification.is_read) markAsRead(notification.id);
                }}
                className={`w-full flex items-start gap-4 p-5 text-left transition-colors hover:bg-neutral-50 ${
                  !notification.is_read ? "bg-primary-50/30" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !notification.is_read
                      ? "bg-primary-100 text-primary-600"
                      : "bg-neutral-100 text-neutral-400"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {getNotificationIcon(notification.type)}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-semibold truncate ${
                        !notification.is_read
                          ? "text-neutral-900"
                          : "text-neutral-600"
                      }`}
                    >
                      {notification.title}
                    </p>
                    {!notification.is_read && (
                      <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 mt-0.5 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1.5">
                    {formatTimeAgo(notification.created_at)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
