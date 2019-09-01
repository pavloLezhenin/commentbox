defmodule CommentboxWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:comments", _message, socket) do
    {:ok, socket}
  end

  def handle_in("comment", %{"body" => body, "username" => username, "date" => date}, socket) do
    broadcast socket, "comment", %{body: body, username: username, date: date}
    {:noreply, socket}
  end

end