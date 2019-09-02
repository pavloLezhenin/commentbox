defmodule CommentboxWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:comments", _message, socket) do
    {:ok, socket}
  end

  def handle_in("comment", %{"message" => message, "username" => username, "date" => date}, socket) do
    map = %{message: message, username: username, date: date}
    tuple = ConCache.get(:comments_cache, :room)
    if tuple == nil do
      ConCache.put(:comments_cache, :room, {map})
    else
      ConCache.put(:comments_cache, :room, Tuple.insert_at(tuple, 0, map))
    end
    broadcast socket, "comment", map
    {:noreply, socket}
  end

end