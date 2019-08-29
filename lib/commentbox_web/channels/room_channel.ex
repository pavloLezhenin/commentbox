defmodule CommentboxWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:comments", _message, socket) do
    {:ok, socket}
  end
  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("comment", %{"body" => body}, socket) do
    broadcast socket, "comment", %{body: body}
    {:noreply, socket}
  end

end